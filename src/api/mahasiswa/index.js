const MahasiswaHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'mahasiswa',
  version: '1.0.0',
  register: async (server, { service }) => {
    const mahasiswaHandler = new MahasiswaHandler(service);
    server.route(routes(mahasiswaHandler));
  },
};
