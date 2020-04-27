import DataLoader from 'dataloader';
import { client } from 'db';
import { indexBy, map, prop, __ } from 'ramda';

const loader = new DataLoader(async ids => {
  const items = await client.users.read(ids);
  const itemMap = indexBy(prop('id'), items);

  return map(prop(__, itemMap))(ids);
});

export { loader };
