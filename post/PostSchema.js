const mongoose = require('mongoose');
const { array } = require('../scripts/upload');

const { Schema } = mongoose;

const PostSchema = new Schema({
    description: String,
    image: String,
    user: String,
    date: { type: Date, default: Date.now },
    likes: { type: Array, default: [] }

}, { collection: 'posts' });

module.exports = mongoose.model('posts', PostSchema);