(function(){
    "use strict";

    angular.module("loginModule").controller("LoginController",LoginController );
    LoginController.$inject = ["$scope","$rootScope", "AUTH_EVENTS", "AuthService"];
    
    function LoginController($scope, $rootScope,  AUTH_EVENTS, AuthService) {
        var vm = this;
       
        vm.loginStatus = null

        vm.login = function (credentials) {
            AuthService.login(credentials).then(function (responce) {
                vm.loginStatus = {
                    type: AUTH_EVENTS.loginSuccess,
                    message: "OK"
                }
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }, function (response) {
                vm.loginStatus = {
                    type: AUTH_EVENTS.loginFailed,
                    message: "password or login incorrect"
                }
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };

    }
})();

