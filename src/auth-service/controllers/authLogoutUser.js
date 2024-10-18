import { autthLogoutUser } from '../services/authLogoutUser.js';

export const authLogoutController = {
  logout: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
      await autthLogoutUser(refreshToken);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
