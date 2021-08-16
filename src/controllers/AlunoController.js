import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: [
        'id',
        'nome',
        'sobrenome',
        'email',
        'idade',
        'peso',
        'altura',
      ],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // ASC = crescente  DESC= decrescente
      include: {
        model: Foto,
        attributes: ['originalname', 'filename', 'url'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400);
        return res.json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await Aluno.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // ASC = crescente  DESC= decrescente
        include: {
          model: Foto,
          attributes: ['originalname', 'filename', 'url'],
        },
      });
      if (!aluno) {
        res.status(400);
        return res.json({
          errors: ['Student not found'],
        });
      }
      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400);
        return res.json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        res.status(400);
        return res.json({
          errors: ['Student not found'],
        });
      }
      await aluno.destroy();
      return res.json('deleted user');
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400);
        return res.json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        res.status(400);
        return res.json({
          errors: ['Student not found'],
        });
      }
      const newData = await aluno.update(req.body);
      return res.json(newData);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

export default new AlunoController();
