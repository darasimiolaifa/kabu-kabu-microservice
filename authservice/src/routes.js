import AuthController from './controllers';
import middleware from './middlewares';

const { validate } = middleware

export default (app) => {
  app.route('/register').post(validate('register'), AuthController.register);
}