const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '.env.local' });

exports.addUser = async (req, res) => {
  const { fullName, job, role, email, phone, address, password } = req.body;

  // Define required fields
  const requiredFields = ['fullName', 'job', 'role', 'email', 'phone', 'address'];

  // Check which required fields are missing
  const missingFields = requiredFields.filter(field => !req.body[field]);

  // If there are missing fields, send a response indicating which fields are missing
  if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
      // Create the user using Prisma's create method
      const newUser = await prisma.user.create({
          data: {
              fullName,
              job,
              role,
              email,
              phone,
              address,
              password: hashedPassword
          }
      });
      // Once the user is successfully created, send a success response
      res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
      // Handle errors
      if (error.code === 'P2002') {
          // Unique constraint violation (email already exists)
          return res.status(400).json({ error: 'Email already exists' });
      } else {
          // Other errors
          console.error('Error creating user:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  } finally {
      // Disconnect Prisma client after use
      await prisma.$disconnect();
  }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({
        status: 'success',
        data: {
          users
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    } finally {
      await prisma.$disconnect();
    }
  };

  exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the user from the database
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: deletedUser
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};


// Update User info
exports.updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { fullName, job, phone, address } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (fullName) user.fullName = fullName;
    if (job) user.job = job;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        fullName: user.fullName,
        job: user.job,
        phone: user.phone,
        address: user.address
      }
    });
    user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    return res.status(200).json({ message: 'User updated successfully', user });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Verified account
exports.updateVerified = async (req, res)=>{
  const userId = parseInt(req.params.id);
  try {
    // Update the user's isVerified attribute to true
    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { isVerified: true },
    });
    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
