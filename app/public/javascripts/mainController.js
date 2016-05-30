angular.module('gallery').controller('MainCtrl', [
    '$scope', 'images',
    function($scope, images) {
        $scope.loading = true;
        var page = 1;
        $scope.images = images.images;
        $scope.loading = false;

        function yHandler() {
            var wrap = document.getElementById('wrap');
            var contentHeight = wrap.offsetHeight;
            var yOffset = window.pageYOffset;
            var y = yOffset + window.innerHeight;
            if (y >= contentHeight) {
                $scope.loading = true;
                page++;
                images.getAll(page).success(function (resp) {
                    $scope.loading = false;
                })
            }
        }

        $scope.load = function () {
            $scope.loading = true;
        }

        window.onscroll = yHandler;
    }
]);