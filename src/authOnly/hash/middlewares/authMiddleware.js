import jwt from 'jsonwebtoken';
import { envConfig } from '../../../config/envConfig.js';
import Logger from '../../../shared/utils/Logger.js';
import { I18n_USER_TOKEN_MESSAGE } from '../../I18n/pt-BR/UserTokenModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: `${I18n_USER_TOKEN_MESSAGE.TOKEN_NOT_PROVIDED}` });
    }

    const decoded = jwt.verify(token, envConfig.JWT.ACCESS_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    Logger.error(error);
    return res
      .status(401)
      .json({ message: `${I18n_USER_TOKEN_MESSAGE.UNAUTHORIZED}` });
  }
};
