export const routes = Object.entries({
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  LOGOUT: '/logout',
  ROOT: '/',
}).reduce((acc, entry) => {
  const [key, value] = entry;

  return {
    ...acc,
    [key]: value,
  };
}, {});
