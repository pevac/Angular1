(function(){
    "use strict";
    angular.module("loginModule", []);

    angular.module("loginModule").controller("LoginController",LoginController );

    LoginController.$inject = ["$scope","$rootScope","AUTH_EVENTS","AuthService","Session", "UserService"]
    function LoginController($scope, $rootScope, AUTH_EVENTS, AuthService,  Session, UserService) {
        var vm = this;
        vm.credentials = {
            login: "",
            password: ""
        };

        vm.loginStatus = {
            type: null,
            message: ""
        }

        // $scope.login = function (credentials) {
        //     AuthService.login(credentials).then(function (user) {
        //         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        //         $rootScope.currentUser = user;
        //     }, function (response) {
        //         $scope.loginStatus.type = AUTH_EVENTS.loginFailed;
        //         $scope.loginStatus.message = "sdfasdfdasf";
        //         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        //     });
        // };

        vm.login = function (credentials) {
            vm.loginStatus.type = AUTH_EVENTS.loginSuccess;
            var currentUser = {
                id: 23,
                role: "admin",
                userName: "ivan1",
                avatar: "img/admin.jpg"
            };
            UserService.setUser(currentUser);

            Session.create(2, 2, "admin");
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        };
    };
})();

