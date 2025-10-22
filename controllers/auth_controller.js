import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

const register = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  console.log(req.body);

  if (!name || !email || !phone || !password || !role) {
    console.log('register failed');

    return res.json({ success: false, message: 'missing details' });
  }
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'library_books',
    });

    const imageData = {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    };
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log('user already esists');

      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
      image: imageData,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log('register succssful');

    return res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: 'missing details' });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log('login failed');

      return res.json({ success: false, message: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('login success');

    return res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    return res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { register, login, logout };
