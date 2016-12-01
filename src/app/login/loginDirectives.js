angular.module("angularApp").directive('formAutofillFix', function ($timeout) {
    return function ($scope, element, attrs) {
        element.prop('method', 'post');
        if (attrs.ngSubmit) {
            $timeout(function () {
                element
                    .unbind('submit')
                    .bind('submit', function (event) {
                        // event.preventDefault();
                        element
                            .find('input')
                            .triggerHandler('change')
                            .triggerHandler('keydown');
                        $scope.$apply(attrs.ngSubmit);
                    });
            });
        }
    };
});

