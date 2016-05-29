var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Image = mongoose.model('Image');
var Tag = mongoose.model('Tag');
var fs = require('fs');
var path = require('path');

// return array of images
router.get('/images', function(req, res, next) {
    Image.find(function(err, images) {
        if (err) {
            return next(err);
        }

        res.json(images);
    });
});

// create an image
router.post('/images', function(req, res, next) {
    var image = new Image(req.body);

    image.save(function(err, image) {
        if (err) {
            return next(err);
        }

        res.json(image);
    });
});

// creates the :image
router.param('image', function(req, res, next, id) {
    var query = Image.findById(id);

    query.exec(function(err, image) {
        if (err) {
            return next(err);
        }
        if (!image) {
            return next(new Error('can\'t find image'));
        }

        req.image = image;
        return next();
    });
});

// returns selected image's tags
router.get('/images/:image', function(req, res, next) {
    req.image.populate('tags', function(err, tags) {
        if (err) {
            return next(err);
        }

        res.json(tags);
    });
});

// add a tag for the selected image
router.post('/images/:image/tags', function(req, res, next) {
    var tag = new Tag(req.body);
    tag.image = req.image;

    tag.save(function(err, tag) {
        if (err) {
            return next(err);
        }

        req.image.tags.push(tag);
        req.image.save(function(err, image) {
            if (err) {
                return next(err);
            }

            res.json(tag);
        });
    });
});

module.exports = router;
