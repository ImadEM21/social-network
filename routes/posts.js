const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');

const auth = require('../middlewares/auth');


router.get('/posts', auth, postController.getPosts);
router.get('/posts/:id', auth, postController.getPost);
router.post('/posts', auth, postController.createPost);
router.put('/posts/:id', auth, postController.modifyPost);
router.delete('/posts/:id', auth, postController.deletePost);


module.exports = router;