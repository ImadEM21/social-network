const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

const multer = require('../middlewares/multer-config');

router.post('/signup', multer, userController.signup);
router.post('/login', userController.login);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', multer, userController.modifyUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;