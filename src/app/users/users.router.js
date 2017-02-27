(function(){
    "use strict";

    angular.module("usersModule").config(UsersRouterConfig);
    UsersRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function UsersRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES){
        $stateProvider
            .state("home.users", {
                url: "/users",
                template:'<div ui-view ></div>',
                abstract: true
            })
            .state("home.users.list", {
                url: "/list",
                templateUrl:"users/usersList/usersList.tmpl.html",
                controller: "UsersController",
                controllerAs: "vm"
            })
            .state("home.users.add", {
                url: "/add",
                templateUrl:"users/userForm/userForm.tmpl.html",
                controller: "AddUserController",
                controllerAs: "vm"
            })
            .state("home.users.edit", {
                url: "/edit",
                templateUrl:"users/userForm/userForm.tmpl.html",
                controller: "AddUserController",
                controllerAs: "vm"
            })
            .state("home.users.view", {
                url: "/view",
                templateUrl:"users/userView/userView.tmpl.html",
                controller: "ViewUserController",
                controllerAs: "vm"                
            })
    }
})();