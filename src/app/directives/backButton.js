(function() {
    angular.module("angularApp")
        .directive('back', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    console.log("hello");
                    elem.bind('click', function () {
                        $window.history.back();
                    });
                }
            };
        }]);
});
