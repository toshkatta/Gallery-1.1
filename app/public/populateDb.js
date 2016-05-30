var fs = require('fs');
var path = require('path')
var imagesPath = path.join(__dirname, '/images');
var querystring = require('querystring');
var http = require('http');


fs.readdir(imagesPath, function(err, items) {
    if (err) {
        console.log('error: ', err);
    } else {
        items.forEach(function(e, i, a) {
            if (e !== "icons") {
                var data = querystring.stringify({
                    name: e.substr(0, e.length - 4)
                });
                var options = {
                    host: 'localhost',
                    port: 3000,
                    path: '/images',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(data)
                    }
                };

                var req = http.request(options, function(res) {
                    res.setEncoding('utf8');
                    res.on('data', function(chunk) {
                        // console.log("body: " + chunk);
                    });
                });

                req.write(data);
                req.end();
            }
        })
    }
})
