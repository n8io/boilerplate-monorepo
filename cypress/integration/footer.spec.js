// describe('footer', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   describe('language toggle', () => {
//     it('toggles english', () => {
//       cy.get('button[data-testid="language"]').click();
//       cy.get('button[data-testid="en"]').click();

//       return cy
//         .window()
//         .then(window => window.localStorage.getItem('language'))
//         .then(language => expect(language).to.eq('en'));
//     });

//     it('toggles dev', () => {
//       cy.get('button[data-testid="language"]').click();
//       cy.get('button[data-testid="dev"]').click();

//       return cy
//         .window()
//         .then(window => window.localStorage.getItem('language'))
//         .then(language => expect(language).to.eq('dev'));
//     });
//   });

//   describe('theme toggle', () => {
//     it('toggles to dark mode when light', () => {
//       cy.get('button[data-testid="theme"]').click();

//       return cy
//         .window()
//         .then(window => window.localStorage.getItem('theme'))
//         .then(json => {
//           const { displayMode } = JSON.parse(json);

//           expect(displayMode).to.eq('dark');
//         });
//     });

//     it('toggles to light mode when dark', () => {
//       window.localStorage.setItem(
//         'theme',
//         JSON.stringify({ displayMode: 'dark' })
//       );

//       cy.visit('/');
//       cy.get('button[data-testid="theme"]').click();

//       return cy
//         .window()
//         .then(window => window.localStorage.getItem('theme'))
//         .then(json => {
//           const { displayMode } = JSON.parse(json);

//           expect(displayMode).to.eq('light');
//         });
//     });
//   });
// });
