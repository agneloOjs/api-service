import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const authVerifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};
