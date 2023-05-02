const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class MahasiswaService {
    constructor() {
        this._pool = new Pool();
    }

    async addMahasiswa({
        nama, jurusan,
      }) {
        const nim = `mhs-${nanoid(8)}`;
    
        const query = {
          text: 'INSERT INTO mahasiswa VALUES($1, $2, $3) RETURNING nim',
          values: [
            nim,
            nama,
            jurusan,
          ],
        };
    
        const result = await this._pool.query(query);
        if (!result.rows[0].nim) {
          throw new InvariantError('Mahasiswa gagal ditambahkan');
        }
    
        return result.rows[0].nim;
    }

    async getMahasiswa() {
        let query = 'SELECT * FROM mahasiswa';
    
        const result = await this._pool.query(query);
    
        return result.rows;
    }

    async deleteMahasiswaByNIM(nim) {
        const query = {
          text: 'DELETE FROM mahasiswa WHERE nim = $1 RETURNING nim',
          values: [nim],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new NotFoundError('Mahasiswa gagal dihapus. NIM tidak ditemukan');
        }
    }
}

module.exports = MahasiswaService;