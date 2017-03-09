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
                controllerAs: "vm",
                resolve: {
                    /* @ngInject */
                    users:  function(Resources) {
                        return  Resources.Users.query().$promise;
                    }
                }
            })
            .state("home.users.add", {
                url: "/add",
                templateUrl:"users/userForm/userForm.tmpl.html",
                controller: "AddUserController",
                controllerAs: "vm",
                params : {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
                
            })
            .state("home.users.edit", {
                url: "/edit",
                templateUrl:"users/userForm/userForm.tmpl.html",
                controller: "AddUserController",
                controllerAs: "vm",
                params : {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.users.view", {
                url: "/view",
                templateUrl:"users/userView/userView.tmpl.html",
                controller: "ViewUserController",
                controllerAs: "vm" ,
                params : {
                    previousState: null,
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage              
            });
            
            clearSessionStorage.$inject = [ "$sessionStorage"];
            function clearSessionStorage($sessionStorage){
                delete    $sessionStorage.stateParams;
            }

            saveSessionStorage.$inject = [ "$stateParams", "$sessionStorage"];
            function saveSessionStorage($stateParams, $sessionStorage){
                if(!$sessionStorage.stateParams){
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: stateParams} );
                } 
                if($stateParams.data) {
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = stateParams;
                } else {
                    for(var key in $sessionStorage.$default().stateParams){
                        $stateParams[key] = $sessionStorage.$default().stateParams[key];
                    }
                }
            }
    }
})();