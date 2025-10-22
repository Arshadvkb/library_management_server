import userModel from '../models/userModel.js';

const viewUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users) {
      return res.json({ success: true, message: 'found users', users });
    } else {
      return res.json({ success: false, message: 'nou users found' });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { viewUser };
