(function(){
    angular.module("fileReaderModule", [])
        .directive("fileReader", [fileReader])
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

    function fileReader() {
            return {
                 restrict: "A",
                require: "?ngModel",
                link: function (scope, element, attributes, ngModel) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(element[0].files[0]);
                                ngModel.$render();
                               
                                attributes.filepreview = loadEvent.target.result;
                            })
                        };
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }
})();
