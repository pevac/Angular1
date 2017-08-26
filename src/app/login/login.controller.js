(function(){
    "use strict";

    angular.module("loginModule").controller("LoginController",LoginController );
    LoginController.$inject = ["$scope","$rootScope","AUTH_EVENTS","AuthService","Session", "UserService", "IdleService"];
    
    function LoginController($scope, $rootScope, AUTH_EVENTS, AuthService,  Session, UserService, IdleService) {
        var vm = this;
       
        vm.loginStatus = {
            type: null,
            message: ""
        }

        // $scope.login = function (credentials) {
        //     AuthService.login(credentials).then(function (user) {
        //         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        //     }, function (response) {
        //         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        //     });
        // };

        vm.login = function () {
            vm.loginStatus.type = AUTH_EVENTS.loginSuccess;
            var currentUser = {
                id: 23,
                role: "admin",
                userName: "ivan1",
                avatar: "./assets/img/admin.jpg"
            };
            UserService.setUser(currentUser);
            IdleService.startTimer();
            
            Session.create(2, "7777",  2, "admin");
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        };
    }
})();

