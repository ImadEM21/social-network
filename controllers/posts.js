const Post = require('../models/Post');

exports.getPosts = (req, res) => {
    Post.find().sort({createdAt: 'desc'})
    .then(posts => res.status(200).json({posts}))
    .catch(error => res.status(400).json({error}));
};

exports.getPost = (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.status(200).json({post}))
    .catch(error => res.status(404).json({error}));
};

exports.createPost = (req, res) => {
    const post = new Post({
        ...req.body,
    });
    post.save()
    .then(() => res.status(201).json({message: "Post bien créé"}))
    .catch(error => res.status(500).json({error}));
};

exports.modifyPost = (req, res) => {
    const post = {
        ...req.body
    };
    Post.findByIdAndUpdate(req.params.id, {...post, _id: req.params.id})
    .then(() => res.status(200).json({message: "Post bien modifié"}))
    .catch(error => res.status(500).json({error}));
};

exports.deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json({message: "Post bien supprimé"}))
    .catch(error => res.status(500).json({error}));
};

