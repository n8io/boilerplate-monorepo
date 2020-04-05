// Code copied and modified from https://github.com/binded/bookshelf-cursor-pagination
// because it doesn't handle schema names properly
const remove = (arr, forEach) => {
  let i = arr.length;

  while (i--) {
    if (forEach(arr[i])) {
      arr.splice(i, 1);
    }
  }

  return arr;
};

const DEFAULT_LIMIT = 10;

const ensurePositiveIntWithDefault = (val, def) => {
  if (!val) return def;
  const _val = parseInt(val, 10);

  if (Number.isNaN(_val)) {
    return def;
  }
  return _val;
};

// eslint-disable-next-line max-params
const count = (origQuery, Model, tableName, idAttribute, limit) => {
  const notNeededQueries = [
    'orderByBasic',
    'orderByRaw',
    'groupByBasic',
    'groupByRaw',
  ];

  const counter = Model.forge();

  return counter
    .query(qb => {
      Object.assign(qb, origQuery);

      // Remove grouping and ordering. Ordering is unnecessary
      // for a count, and grouping returns the entire result set
      // What we want instead is to use `DISTINCT`
      remove(
        qb._statements,
        statement =>
          notNeededQueries.indexOf(statement.type) > -1 ||
          statement.grouping === 'columns'
      );

      qb.countDistinct([`${tableName}.${idAttribute}`]);
    })
    .fetchAll()
    .then(result => {
      const metadata = { limit };

      if (result && result.length === 1) {
        // We shouldn't have to do this, instead it should be
        // result.models[0].get('count')
        // but SQLite uses a really strange key name.
        const [modelsCount] = result.models;
        const keys = Object.keys(modelsCount.attributes);

        if (keys.length === 1) {
          const [key] = Object.keys(modelsCount.attributes);

          metadata.rowCount = parseInt(modelsCount.attributes[key], 10);
        } else {
          // some keys were probably added due to a custom .parse method on the model
          // fallback to using the "count" attribute
          metadata.rowCount = parseInt(modelsCount.get('count'), 10);
        }
      }

      return metadata;
    });
};

const isDesc = str => typeof str === 'string' && str.toLowerCase() === 'desc';

const reverseDirection = d => (isDesc(d) ? 'ASC' : 'DESC');

const reverseOrderBy = qb => {
  qb._statements
    .filter(s => s.type === 'orderByBasic')
    .forEach(s => {
      s.direction = reverseDirection(s.direction);
    });
};

const reverseSign = sign => ({ '<': '>', '>': '<' }[sign]);

// eslint-disable-next-line max-statements
const applyCursor = (qb, cursor, mainTableName, idAttribute) => {
  const isNotSorted =
    qb._statements.filter(s => s.type === 'orderByBasic').length === 0;

  // We implicitly sort by ID asc
  if (isNotSorted) {
    qb.orderBy(`${mainTableName}.${idAttribute}`, 'asc');
  }

  const sortedColumns = qb._statements
    .filter(s => s.type === 'orderByBasic')
    // eslint-disable-next-line max-statements
    .map(({ direction: _direction, value }) => {
      const direction = isDesc(_direction) ? 'desc' : 'asc';
      const parts = value.split('.');
      let colName = null;
      let tableName = null;

      if (parts.length === 3) {
        const [schema, table, column] = parts;

        tableName = `${schema}.${table}`;
        colName = column;
      } else {
        [tableName, colName] = parts;
      }

      if (typeof colName === 'undefined') {
        // not prefixed by table name
        return { direction, name: tableName, tableName: mainTableName };
      }
      return { direction, name: colName, tableName };
    });

  // eslint-disable-next-line max-statements
  const buildWhere = (
    chain,
    [currentCol, ...remainingCols],
    visitedCols = []
  ) => {
    const { direction } = currentCol;
    const index = visitedCols.length;
    const cursorValue = cursor.columnValues[index];
    const cursorType = cursor.type;
    let sign = isDesc(direction) ? '<' : '>';

    if (cursorType === 'before') {
      sign = reverseSign(sign);
    }
    const colRef = col => `${col.tableName}.${col.name}`;

    chain.orWhere(function orWhere() {
      this.andWhere(function andWhere() {
        if (cursorValue !== null) {
          this.where(colRef(currentCol), sign, cursorValue);
          if (sign === '>') {
            // In PostgreSQL, `where somecol > 'abc'` does not return
            // rows where somecol is null. We must explicitly include them
            // with `where somecol is null`
            this.orWhere(colRef(currentCol), 'is', null);
          }
        } else if (sign === '<') {
          // `col < null` does not work as expected,
          // we use `IS NOT null` instead
          this.where(colRef(currentCol), 'is not', cursorValue);
        } else {
          this.where(colRef(currentCol), '>', cursorValue);
        }
      });
      visitedCols.forEach((visitedCol, idx) => {
        const colValue = cursor.columnValues[idx];
        // If column is null, we have to use "IS" instead of "="
        const operand = colValue === null ? 'is' : '=';

        this.andWhere(colRef(visitedCol), operand, colValue);
      });
    });

    if (!remainingCols.length) return undefined;

    return buildWhere(chain, remainingCols, [...visitedCols, currentCol]);
  };

  if (cursor) {
    if (sortedColumns.length !== cursor.columnValues.length) {
      throw new Error('sort/cursor mismatch');
    }

    qb.andWhere(function andWhere() {
      buildWhere(this, sortedColumns);
    });

    // "before" is just like after if we reverse the sort order
    if (cursor.type === 'before') {
      reverseOrderBy(qb);
    }
  }

  // This will only work if column name === attribute name
  const model2cursor = model => {
    if (typeof model.toCursorValue === 'function') {
      return sortedColumns.map(c => model.toCursorValue(c));
    }
    return sortedColumns.map(({ name }) => model.get(name));
  };

  const extractCursors = coll => {
    if (!coll.length) return {};
    const before = model2cursor(coll.models[0]);
    const after = model2cursor(coll.models[coll.length - 1]);

    if (cursor && cursor.type === 'before') {
      // sort is reversed so after is before and before is after
      return { after: before, before: after };
    }
    return { after, before };
  };

  return coll => ({
    cursors: extractCursors(coll),
    orderedBy: sortedColumns,
  });
};

const ensureArray = val => {
  if (!Array.isArray(val)) {
    throw new Error(`${val} is not an array`);
  }
};

/**
 * Exports a plugin to pass into the bookshelf instance, i.e.:
 *
 *      import config from './knexfile'
 *      import knex from 'knex'
 *      import bookshelf from 'bookshelf'
 *
 *      const ORM = bookshelf(knex(config))
 *
 *      ORM.plugin('bookshelf-cursor-pagination')
 *
 *      export default ORM
 *
 * The plugin attaches an instance methods to the bookshelf
 * Model object: fetchCursorPage.
 *
 * Model#fetchCursorPage works like Model#fetchAll, but returns a single page of
 * results instead of all results, as well as the pagination information
 *
 * See methods below for details.
 */
export default bookshelf => {
  /**
   * @method Model#fetchCursorPage
   * @belongsTo Model
   *
   * Similar to {@link Model#fetchAll}, but fetches a single page of results
   * as specified by the limit (page size) and cursor (before or after).
   *
   * Any options that may be passed to {@link Model#fetchAll} may also be passed
   * in the options to this method.
   *
   * To perform pagination, you may include *either* an `after` or `before`
   * cursor.
   *
   * By default, with no parameters or missing parameters, `fetchCursorPage` will use an
   * options object of `{limit: 1}`
   *
   * Below is an example showing the user of a JOIN query with sort/ordering,
   * pagination, and related models.
   *
   * @example
   *
   * Car
   * .query(function (qb) {
   *    qb.innerJoin('manufacturers', 'cars.manufacturer_id', 'manufacturers.id')
   *    qb.groupBy('cars.id')
   *    qb.where('manufacturers.country', '=', 'Sweden')
   * })
   * .orderBy('-productionYear') // Same as .orderBy('cars.productionYear', 'DESC')
   * .fetchCursorPage({
   *    limit: 15, // Defaults to 10 if not specified
   *    after: 3,
   *
   *    withRelated: ['engine'] // Passed to Model#fetchAll
   * })
   * .then(function (results) {
   *    console.log(results) // Paginated results object with metadata example below
   * })
   *
   * // Pagination results:
   *
   * {
   *    models: [<Car>], // Regular bookshelf Collection
   *    // other standard Collection attributes
   *    ...
   *    pagination: {
   *        rowCount: 53, // Total number of rows found for the query before pagination
   *        limit: 15, // The requested number of rows per page
   *    }
   * }
   *
   * @param options {object}
   *    The pagination options, plus any additional options that will be passed to
   *    {@link Model#fetchAll}
   * @returns {Promise<Model|null>}
   */
  const fetchCursorPage = ({ self, collection, Model }, options = {}) => {
    const { limit, ...fetchOptions } = options;

    const origQuery = self.query().clone();

    const cursor = (() => {
      if (options.after) {
        ensureArray(options.after);
        return { columnValues: options.after, type: 'after' };
      } else if (options.before) {
        ensureArray(options.before);
        return { columnValues: options.before, type: 'before' };
      }
      return null;
    })();

    const _limit = ensurePositiveIntWithDefault(limit, DEFAULT_LIMIT);

    const { tableName } = Model.prototype;
    const idAttribute = Model.prototype.idAttribute
      ? Model.prototype.idAttribute
      : 'id';

    const paginate = () => {
      const pager = collection.clone();

      let extractCursorMetadata = null;

      return pager
        .query(qb => {
          Object.assign(qb, origQuery.clone());

          extractCursorMetadata = applyCursor(
            qb,
            cursor,
            tableName,
            idAttribute
          );

          qb.limit(_limit);
        })
        .fetch(fetchOptions)
        .then(coll => ({ coll, ...extractCursorMetadata(coll) }));
    };

    const promises = [
      paginate(),
      count(origQuery.clone(), Model, tableName, idAttribute, _limit),
    ];

    return Promise.all(promises).then(
      ([{ coll, cursors, orderedBy }, metadata]) => {
        const hasMore = coll.length === limit;
        const pageData = Object.assign(metadata, { hasMore });

        const next = () => {
          if (!hasMore) {
            return false;
          }
          const newOptions = options.before
            ? {
                ...options,
                before: cursors.before,
              }
            : {
                ...options,
                after: cursors.after,
              };

          return fetchCursorPage({ Model, collection, self }, newOptions);
        };

        return Object.assign(coll, {
          next: hasMore ? next : false,
          pagination: {
            ...pageData,
            cursors,
            orderedBy,
          },
        });
      }
    );
  };

  const forEach = async (context, fetchOpts, callback = () => null) => {
    let coll = null;

    coll = await fetchCursorPage(context, fetchOpts);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line callback-return,no-await-in-loop
      await callback(coll);
      if (!coll.next) return;
      // eslint-disable-next-line no-await-in-loop
      coll = await coll.next();
    }
  };

  // eslint-disable-next-line func-name-matching
  bookshelf.Model.prototype.fetchCursorPage = function modelFetchCursorPage(
    ...args
  ) {
    return fetchCursorPage(
      {
        Model: this.constructor,
        collection: () => this.collection(),
        self: this,
      },
      ...args
    );
  };

  // eslint-disable-next-line func-name-matching
  bookshelf.Model.fetchCursorPage = function staticModelFetchCursorPage(
    ...args
  ) {
    return this.forge().fetchCursorPage(...args);
  };

  // eslint-disable-next-line func-name-matching
  bookshelf.Collection.prototype.fetchCursorPage = function collectionFetchCursorPage(
    ...args
  ) {
    return fetchCursorPage(
      {
        Model: this.model,
        collection: this,
        self: this,
      },
      ...args
    );
  };

  // eslint-disable-next-line func-name-matching
  bookshelf.Model.prototype.forEach = function modelForEach(...args) {
    return forEach(
      {
        Model: this.constructor,
        collection: () => this.collection(),
        self: this,
      },
      ...args
    );
  };

  // eslint-disable-next-line func-name-matching
  bookshelf.Model.forEach = function staticModelForEach(...args) {
    return this.forge().forEach(...args);
  };

  // eslint-disable-next-line func-name-matching
  bookshelf.Collection.prototype.forEach = function collectionForEach(...args) {
    return forEach(
      {
        Model: this.model,
        collection: this,
        self: this,
      },
      ...args
    );
  };
};
