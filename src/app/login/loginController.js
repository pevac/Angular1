angular.module("angularApp").controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location) {
    $scope.credentials = {
        login: "",
        password: ""
    };

    $scope.login = function (credentials) {
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $rootScope.currentUser = user;
            $location.path("/api/home")
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
});
