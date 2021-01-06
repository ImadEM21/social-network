const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');


router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.modifyPost);
router.delete('/posts/:id', postController.deletePost);


module.exports = router;