(function(){
    "use strict";
    angular.module("angularApp").controller("LoginController",LoginController );

    LoginController.$inject = ["$scope","$rootScope","AUTH_EVENTS","AuthService","$location","Session"]
    function LoginController($scope, $rootScope, AUTH_EVENTS, AuthService, $location, Session) {
        $scope.credentials = {
            login: "",
            password: ""
        };

        $scope.loginStatus = {
            type:null,
            message: ""
        }

        // $scope.login = function (credentials) {
        //     AuthService.login(credentials).then(function (user) {
        //         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        //         $rootScope.currentUser = user;
        //         $location.path("/");
        //     }, function (response) {
        //         var a = response;
        //         $scope.loginStatus.type = AUTH_EVENTS.loginFailed;
        //         $scope.loginStatus.message = "sdfasdfdasf";
        //         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        //     });
        // };

        $scope.login = function (credentials) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $rootScope.currentUser = {
                id: 23,
                role: "admin",
                userName: "vasyl",
                avatar: "img/admin.jpg"
            };
            Session.create(2, 2, "admin");
            $location.path("/");
        };
    }
})();

