var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    name: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }
});

mongoose.model('Tag', TagSchema);
