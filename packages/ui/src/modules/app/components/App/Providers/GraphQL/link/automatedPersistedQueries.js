import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

const link = createPersistedQueryLink({ useGETForHashedQueries: true });

export { link };
