const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// Function to compare the encrypted password from the database
const comparePasswords = async (password, hashedPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword)
      return match
    } catch (error) {
      console.log(error)
      throw new Error('Error comparing passwords')
    }
  }

const generateToken = (user) => {
  
  // Create a JWT token with user data
  const token = jwt.sign({ email: user.email , role :user.role , phone: user.phone,
     fullName: user.fullName , address: user.address}, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time (optional)
  });
  return token;
};

module.exports = { comparePasswords ,generateToken };
