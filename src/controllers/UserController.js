import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const { nome, email } = user;
      return res.json({ id, nome, email });
    } catch (err) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const id = req.userId;
      if (!id) {
        res.status(400);
        return res.json({
          errors: ['Missing ID'],
        });
      }
      const user = await User.findByPk(id);
      if (!user) {
        res.status(400);
        return res.json({
          errors: ['User not found'],
        });
      }
      const newData = await user.update(req.body);
      const { nome, email } = newData;
      return res.json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;
      if (!id) {
        res.status(400);
        return res.json({
          errors: ['Missing ID'],
        });
      }
      const user = await User.findByPk(id);
      if (!user) {
        res.status(400);
        return res.json({
          errors: ['User not found'],
        });
      }
      await user.destroy();
      return res.json('deleted user');
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

export default new UserController();
