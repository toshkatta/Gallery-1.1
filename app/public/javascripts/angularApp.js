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