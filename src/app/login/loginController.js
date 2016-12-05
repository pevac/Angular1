angular.module("angularApp").controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location) {
    $scope.credentials = {
        login: "",
        password: ""
    };

    $scope.loginStatus = {
        type:null,
        message: ""
    }



    $scope.login = function (credentials) {
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $rootScope.currentUser = user;
            $location.path("/");
        }, function (response) {
            var a = response;
            $scope.loginStatus.type = AUTH_EVENTS.loginFailed;
            $scope.loginStatus.message = "sdfasdfdasf";
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
});
