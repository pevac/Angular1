(function(){
    "use strict";

    angular.module("loginModule").controller("LoginController",LoginController );
    LoginController.$inject = ["$rootScope", "AUTH_EVENTS", "AuthService", "$state"];
    
    function LoginController($rootScope,  AUTH_EVENTS, AuthService, $state) {
        var vm = this;
        vm.loginStatus = null

        vm.login = function () {
            AuthService.login(vm.credentials).then(function (responce) {
                vm.loginStatus = {
                    type: AUTH_EVENTS.loginSuccess,
                    message: "OK"
                }
                $state.go("home");

            },function (responce) {
                vm.loginStatus = {
                    type: AUTH_EVENTS.loginFailed,
                    message: "password or login incorrect"
                }
            });
        };

    }
})();

