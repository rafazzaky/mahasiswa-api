const autoBind = require('auto-bind');

class MahasiswaHandler {
    constructor(service, validator) {
        this._service = service;
    
        autoBind(this);
    }

    async postMahasiswaHandler(req, h) {
    
        const nim = await this._service.addMahasiswa(req.payload);
    
        const response = h.response({
          status: 'success',
          message: `Mahasiswa dengan nim ${nim} berhasil ditambahkan`,
          data: {
            nim,
          },
        });
        response.code(201);
        return response;
    }

    async getMahasiswaHandler() {
        const mahasiswa = await this._service.getMahasiswa();
    
        return {
          status: 'success',
          data: {
            mahasiswa,
          },
        };
    }

    async deleteMahasiswaByNIMHandler(req, h) {
        const { nim } = req.params;
        
        await this._service.deleteMahasiswaByNIM(nim);
        return {
          status: 'success',
          message: 'Mahasiswa berhasil dihapus',
        };
    }
}

module.exports = MahasiswaHandler;