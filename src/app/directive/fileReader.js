angular.module('fileReaderModule', [])
    .directive("fileReader", ["$parse", function () {
        return {
            require: '?ngModel',

            link: function (scope, element, attributes, ngModel) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            var file  = {
                                lastModified: changeEvent.target.files[0].lastModified,
                                lastModifiedDate: changeEvent.target.files[0].lastModifiedDate,
                                name: changeEvent.target.files[0].name,
                                size: changeEvent.target.files[0].size,
                                type: changeEvent.target.files[0].type,
                                data: loadEvent.target.result
                            };
                            ngModel.$setViewValue(file);
                            ngModel.$render();
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);

