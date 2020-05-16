/* eslint-disable no-console */
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(`err :${err}`);
  console.log(`runnable :${runnable}`);

  return false;
});
/* eslint-enable no-console */
