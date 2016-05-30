var app = angular.module('gallery', ['ui.router', 'ui.bootstrap']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    imagePromise: ['images', function(images) {
                        return images.getAll();
                    }]
                }
            })
            .state('images', {
                url: '/image/{id}',
                templateUrl: '/images.html',
                controller: 'ImagesCtrl',
                resolve: {
                    image: ['$stateParams', 'images', function($stateParams, images) {
                        return images.get($stateParams.id);
                    }]
                }
            });

        // $locationProvider.html5Mode(true)
    }
]);

app.factory('images', ['$http', function($http) {
    var o = {
        images: []
    };
    o.getAll = function() {
        return $http.get('/images').success(function(data) {
            angular.copy(data, o.images);
        });
    };
    o.create = function(post) {
        return $http.post('/images', post).success(function(data) {
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

app.controller('MainCtrl', [
    '$scope', 'images',
    function($scope, images) {
        images.images.forEach(function(e, i, a) {
            a[i] = {
                name: e.name,
                src: "/images/" + e.name + ".jpg",
                tags: e.tags,
                _id: e._id
            }
        })

        $scope.images = images.images;
    }
]);

app.controller('ImagesCtrl', [
    '$scope', 'images', 'image',
    function($scope, images, image) {
        $scope.image = image;
        $scope.addTag = function() {
            if ($scope.body === '') {
                return;
            }

            images.addTag(image._id, {
                name: $scope.body,
            }).success(function(tag) {
                $scope.image.tags.push(tag);
            });

            $scope.body = '';
        };
    }
]);

app.directive('lightbox', function() {
    return {
        restrict: 'E',
        templateUrl: "/templates/lightbox.html",
        scope: {
            images: '='
        },

        replace: true,

        controller: function($rootScope, $scope) {
            $scope.path = "src";
            $scope.tileWidth = 150;
            $scope.tileHeight = 150;

            $scope.displayImage = function(img) {
                $scope.selected = $scope.images.indexOf(img);
                $scope.selectedImg = img;
                $scope.showModal = true;

                var body = document.getElementsByTagName('body')[0];
                body.classList.add('stop-scrolling');
            };

            $scope.source = function(img) {
                if (img) {
                    return img[$scope.path];
                }
            };

            $scope.hasPrev = function() {
                return ($scope.selected !== 0);
            };
            $scope.hasNext = function() {
                return ($scope.selected < $scope.images.length - 1);
            };

            $scope.next = function() {
                $scope.selected = $scope.selected + 1;
                $scope.selectedImg = $scope.images[$scope.selected];
            };

            $scope.prev = function() {
                $scope.selected = $scope.selected - 1;
                $scope.selectedImg = $scope.images[$scope.selected];
            };

            $scope.closeModal = function() {
                $scope.showModal = false;
                var body = document.getElementsByTagName('body')[0];
                body.className = body.className.replace(/\bstop-scrolling\b/, '');
            };

            document.onkeyup = function(e) {
                switch (e.keyCode) {
                    case 27 :
                        $scope.closeModal()
                        break;
                    case 39 :
                        if ($scope.hasNext()) {
                            $scope.next()
                        }

                        break;
                    case 37 :
                        if ($scope.hasPrev()) {
                            $scope.prev()
                        }

                        break;
                }

                $scope.$apply()
            };
        }
    };
});
