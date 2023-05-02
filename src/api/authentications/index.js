const AuthenticationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (
    server,
    {
      authenticationsService, tokenManager, validator,
    },
  ) => {
    const authenticationHandler = new AuthenticationHandler(
      authenticationsService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationHandler));
  },
};