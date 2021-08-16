import multer from 'multer';
import multerConfig from '../config/multer';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        res.status(400);
        return res.json({
          errors: [err.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const foto = await Foto.create({ originalname, filename, aluno_id });
        return res.json(foto);
      } catch (err) {
        res.status(400);
        return res.json({
          errors: ['Student not found'],
        });
      }
    });
  }
}

export default new FotoController();
