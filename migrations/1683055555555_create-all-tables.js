/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('authentications', {
        token: {
          type: 'TEXT',
          notNull: true,
        },
    });
    pgm.createTable('mahasiswa', {
        nim: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        nama: {
          type: 'TEXT',
          notNull: true,
        },
        jurusan: {
          type: 'TEXT',
          notNull: true,
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('authentications');
    pgm.dropTable('mahasiswa');
    
};
