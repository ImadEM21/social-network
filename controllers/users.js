const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 12)
    .then(hash => {
        const user = new User({
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

exports.login = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            res.status(404).json({message: "L'utilisateur n'existe pas"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                res.status(401).json({message: "Mot de passe incorrect"});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.USER_TOKEN,
                    {expiresIn: '3h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};