(function(){
    angular.module("fileReaderModule", [])
        .directive("fileReader", [fileReader]);

    function fileReader() {
            return {
                require: "?ngModel",

                link: function (scope, element, attributes, ngModel) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(element[0].files[0]);
                                ngModel.$render();
                            })
                        };
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }
})();
