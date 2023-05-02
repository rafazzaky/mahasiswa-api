require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');

const mahasiswa = require('./api/mahasiswa');
const MahasiswaService = require('./services/MahasiswaService');

const ClientError = require('./exceptions/ClientError');

const init = async () => {
    const authenticationsService = new AuthenticationsService();
    const mahasiswaService = new MahasiswaService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
          cors: {
            origin: ['*'],
          },
        },
      });

      server.ext('onPreResponse', (request, h) => {
        const { response } = request;
        if (response instanceof Error) {
          if (response instanceof ClientError) {
            const newResponse = h.response({
              status: 'fail',
              message: response.message,
            });
            newResponse.code(response.statusCode);
            return newResponse;
          }
          if (!response.isServer) {
            return h.continue;
          }
          const newResponse = h.response({
            status: 'error',
            message: 'terjadi kegagalan pada server kami',
          });
          newResponse.code(500);
          return newResponse;
        }
        return h.continue;
      });

      await server.register([
        {
          plugin: Jwt,
        }
      ]);

      server.auth.strategy('dotindonesia_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
          aud: false,
          iss: false,
          sub: false,
          maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
          isValid: true,
          credentials: {
            id: artifacts.decoded.payload.id,
          },
        }),
      });

      await server.register([
        {
            plugin: authentications,
            options: {
                authenticationsService,
                tokenManager: TokenManager,
            },
        },
        {
            plugin: mahasiswa,
            options: {
                service: mahasiswaService,
            },
        }
      ]);

      await server.start();
      console.info(`Server running in ${server.info.uri}`);
}

init();