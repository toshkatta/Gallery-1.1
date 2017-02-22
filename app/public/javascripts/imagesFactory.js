angular.module('gallery').factory('images', ['$http', function($http) {
    if (window.innerWidth <= 480) {
        perPage = 4;
    } else if (window.innerWidth <= 768) {
        perPage = 7;
    } else if (window.innerWidth <= 992) {
        perPage = 10;
    } else if (window.innerWidth <= 1200) {
        perPage = 13;
    } else {
        perPage = 16;
    }

    var o = {
        images: []
    };

    o.getAll = function(page) {
        if (!page || page === 1) {
            page = 1;
            o.images = []
        }

        return $http.get('/images?page=' + page + '&perPage=' + perPage).then(function(data) {
            console.log(data);
            let imgs = data.data;
            imgs.forEach(function(e, i, a) {
                a[i] = {
                    name: e.name,
                    src: "/images/" + e.name + ".jpg",
                    tags: e.tags,
                    _id: e._id
                }
            })

            imgs = o.images.concat(imgs)
            return angular.copy(imgs, o.images);
        });
    };
    o.create = function(post) {
        return $http.post('/images', post).then(function(data) {
            o.images.push(data);
        });
    };
    o.get = function(id) {
        return $http.get('/images/' + id).then(function(res) {
            return res.data;
        });
    };
    o.addTag = function(id, tag) {
        return $http.post('/images/' + id + '/tags', tag);
    };
    return o;
}]);