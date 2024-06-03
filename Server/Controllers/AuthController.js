const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const { comparePasswords , generateToken } = require('../utils/Utils');
const { serialize } = require('cookie'); // Import cookie serialization function
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


exports.resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Old password does not match' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '10h'
    });

    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    }));

    // Return success message
    return res.status(200).json({ message: 'Password reset successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}



// Reset Password
// exports.resetPassword = async (req, res)=>{
//   try {
//     const { email, newPassword } = req.body;
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // newPassword
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         password: hashedPassword,
//       },
//     });
    

//     // Generate and send authentication token
//     const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '10h'
//     });

//     res.setHeader('Set-Cookie', serialize('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24,
//       path: '/',
//     }));

//     return res.status(200).json({ message: 'Password reset successful', token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }


// }



// Handler for POST /signIn endpoint
exports.signIn = async (req, res) => {
  console.log('try try')
  try {
    const { email, password } = req.body
    // Use Prisma to find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate and send authentication token
    // const token = generateToken(user); 
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '10h'
    })
    // Set cookie with JWT token
     res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/', // Root path for the cookie
    }));
    return res.status(200).json({ message: 'Authentication successful', user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Middleware to check if the user making the request has the 'Admin' role
exports.isadmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: 'Missing token' })
      }
      const decodedToken = jwt.decode(token, process.env.JWT_SECRET)
      if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({ message: 'Invalid token' })
      }
      const { role } = decodedToken
      if (role !== 'Admin') {
        return res.status(403).json({ message: 'User is not authorized to perform this action' })
      }
      next()
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }