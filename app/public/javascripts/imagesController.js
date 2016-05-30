angular.module('gallery').controller('ImagesCtrl', [
    '$scope', 'images', 'image',
    function($scope, images, image) {
        var body = document.getElementsByTagName('body')[0];
        body.className = body.className.replace(/\bstop-scrolling\b/, '');
        image.src = '/images/' + image.name + '.jpg';
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