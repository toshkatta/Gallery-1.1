var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var include = [path.resolve(__dirname, "/views")];
// var fileImportsExclude = [];

module.exports = {
    devtool: 'source-map',

    entry: [
        './app.js'
    ],

    output: {
        // absolute path to dist directory
        path: path.resolve(__dirname, '/public'),
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/public/'
    },

    module: {
        // noParse: [],
        loaders: [

            // --- compile es6 to es5
            {
                test: /\.js$/,
                include: include,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?cacheDirectory'
            },

            // --- compile jade to html
            {
                test: /\.jade$/,
                include: include,
                exclude: [],
                loader: 'jade-loader'
            }
        ]
    },
    plugins: []
};
