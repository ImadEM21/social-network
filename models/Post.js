const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    body: {type: String, required: true},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    comments: [
        {
            body: {type: String, required: true},
            username: {type: String, required: true},
            createdAt: {type: Date, default: Date.now}
        }
    ],
    likes: [
        {
            username: {type: String, required: true},
            createdAt: {type: Date, default: Date.now}
        }
    ],
    user: {type: Schema.Types.ObjectId, ref: 'users'}
});

module.exports = model('Post', postSchema);