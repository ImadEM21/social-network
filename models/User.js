const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    userImage: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: false},
    country: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

userSchema.plugin(uniqueValidator);

module.exports = model('User', userSchema);
