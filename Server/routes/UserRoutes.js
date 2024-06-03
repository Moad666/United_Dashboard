const router = require('express').Router();

const userController  = require('../Controllers/UserController')
const authController  = require('../Controllers/AuthController')
// Route to add a user(accees for admins only)
router.post('/addUser',authController.isadmin, userController.addUser);
// Route to get Smes
router.get('/getUsers', userController.getAllUsers)
// Route to delete a user by ID
router.delete('/users/:id', userController.deleteUserById);
// Route to update a user 
router.patch('/update/:id', userController.updateUser)
// Update Unverified
router.patch('/verify/:id', userController.updateVerified)


module.exports = router