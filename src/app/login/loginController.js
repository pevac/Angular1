angular.module("angularApp").controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location) {
    $scope.credentials = {
        login: "",
        password: ""
    };
    $scope.login = function (credentials) {
        var dd = AuthService.login(credentials)();
         console.log($rootScope);
        $scope.setCurrentUser(dd);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $location.path('/home');
        };

    // $scope.login = function (credentials) {
    //     AuthService.login(credentials).then(function (user) {
    //         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    //         $scope.setCurrentUser(user);
    //     }, function () {
    //         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    //     });
    // };
});
