angular.module('gallery').directive('lightbox', function() {
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
                    case 27:
                        $scope.closeModal()
                        break;
                    case 39:
                        if ($scope.hasNext()) {
                            $scope.next()
                        }

                        break;
                    case 37:
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