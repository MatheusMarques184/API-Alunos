import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401);
    return res.json({
      errors: ['Login required'],
    });
  }
  const [, token] = authorization.split(' ');
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });
    if (!user) {
      res.status(401);
      return res.json({
        errors: ['Invalid user'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (err) {
    res.status(401);
    return res.json({
      errors: ['Invalid token'],
    });
  }
};
