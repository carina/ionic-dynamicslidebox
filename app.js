angular.module('myApp', ['ionic'])

    .controller('AppController', function ($scope, $interval, $ionicSlideBoxDelegate, $timeout) {

        var slideCounter = 3;
        var validator = true;
        $scope.oldIndex = 1;

        $scope.data = {};
        $scope.data.slides = [
            {
                title:"Slide 1",
                data:"Slide 1 Content",
                active:true
            },
            {
                title:"Slide 2",
                data:"Slide 2 Content",
                active:true
            },
            {
                title:"Slide 3",
                data:"Slide 3 Content",
                active:true
            }
        ];

        $scope.slideChanged = function (newIndex) {
            var oldIndex = $scope.oldIndex;
            $scope.oldIndex = newIndex;

            if (!validator) {
                validator = true;
                return
            }
            validator = false;

            console.log("oldIndex = " + $scope.oldIndex);
            console.log("newIndex = " + newIndex);

            var updateFunc;

            if (newIndex >= oldIndex) {
                console.log('Adding a slide');
                updateFunc = function () {
                    slideCounter++;
                    $scope.data.slides.splice(0, 1);
                    $scope.data.slides.push({
                        title:"Slide " + slideCounter,
                        data:"Slide " + slideCounter + ' Content'
                    });
                };
            } else {
                console.log('Removinvg a slide');
                updateFunc = function () {
                    slideCounter--;
                    $scope.data.slides.pop();
                    $scope.data.slides.unshift({
                        title:"Slide " + (slideCounter - 2),
                        data:"Slide " + (slideCounter - 2) + ' Content'
                    });
                };

            }

            $timeout(function () {
                updateFunc();
                $ionicSlideBoxDelegate.update();
            }, 50).then(function () {
                $ionicSlideBoxDelegate.slide(1);
            });

        }
    });