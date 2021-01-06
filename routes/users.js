const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

const multer = require('../middlewares/multer-config');

router.post('/signup', multer, userController.signup);
router.post('/login', userController.login);


module.exports = router;