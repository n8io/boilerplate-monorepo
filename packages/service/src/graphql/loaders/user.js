import DataLoader from 'dataloader';
import { usersReadAll } from 'db/user/usersReadAll';
import { Models } from 'models';
import { indexBy, map, prop, __ } from 'ramda';

const loader = new DataLoader(async ids => {
  const context = { Models };
  const items = await usersReadAll(ids, context);
  const itemMap = indexBy(prop('id'), items);

  return map(prop(__, itemMap))(ids);
});

export { loader };
