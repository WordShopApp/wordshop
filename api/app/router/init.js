module.exports = (app) => {

  // account
  let accountController = require('../controllers/accountController');
  app.post('/profile', accountController.profileCreate);
  app.get('/profile', accountController.profileShow);
  app.get('/profile/validate-username', accountController.usernameValidate);

  // user
  let userController = require('../controllers/userController');
  app.get('/users/:id', userController.show);

  // root
  let appController = require('../controllers/appController');
  app.get('/', appController.status);

};
