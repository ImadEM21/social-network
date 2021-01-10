const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 12)
    .then(hash => {
        const user =  new User({
            ...req.body,
            password: hash,
            userImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        user.save()
        .then(() => res.status(201).json({message: "Utiisateur bien créer"}))
        .catch(error => res.status((500).json({error})));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(404).json({message: "L'utilisateur n'existe pas"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({message: "Mot de passe incorrect"});
            }
            return res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.USER_TOKEN,
                    {expiresIn: '3h'}
                )
            });
        })
        .catch(error => next(error));
    })
    .catch(error => res.status(500).json({error}));
};

exports.modifyUser = (req, res) => {
    const user = req.file ? {
        ...req.body,
        userImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    User.findByIdAndUpdate(req.params.id, {...user, _id: req.params.id})
    .then(() => res.status(200).json({message: "Utilisateur bien modifié"}))
    .catch(error => res.status(500).json({error}));
};

exports.deleteUser = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        const filename = user.userImage.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            User.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({message: "Utilisateur bien supprimé"}))
            .catch(error => res.status(500).json({error}));
        });
    })
    .catch();
};

exports.getUser = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(500).json({error}));
};