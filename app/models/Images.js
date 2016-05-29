var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    name: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

mongoose.model('Image', ImageSchema);
