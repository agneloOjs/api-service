import { authenticateUser } from '../services/authenticateToken.js';

export const authenticateController = {
  login: async (req, res) => {
    const { email, password, deviceName } = req.body;

    try {
      const tokens = await authenticateUser(email, password, deviceName);
      res.status(200).json(tokens);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
};
