import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      res.status(400);
      return res.json({
        errors: ['Invalid password or email'],
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400);
      return res.json({
        errors: ['User not found'],
      });
    }
    if (!(await user.passwordIsValid(password))) {
      return res.json({
        errors: ['Invalid password'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token });
  }
}

export default new TokenController();
