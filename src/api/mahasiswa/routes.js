const routes = (handler) => [
    {
      method: 'POST',
      path: '/mahasiswa',
      handler: handler.postMahasiswaHandler,
      options: {
        auth: 'dotindonesia_jwt',
      },
    },
    {
      method: 'GET',
      path: '/mahasiswa',
      handler: handler.getMahasiswaHandler,
      options: {
        auth: 'dotindonesia_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/mahasiswa/{nim}',
      handler: handler.deleteMahasiswaByNIMHandler,
      options: {
        auth: 'dotindonesia_jwt',
      },
    },
  ];
  
  module.exports = routes;