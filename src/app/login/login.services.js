(function(){
    "use strict";
    angular.module("loginModule")
        .factory("AuthService", AuthService )
        .service("Session", Session)
        .factory("AuthInterceptor", AuthInterceptor)
        .factory("AuthResolver",AuthResolver)
        .factory('UserService', UserService);

    AuthService.$inject = ["$http", "Session","UserService"];
    function AuthService($http, Session, UserService) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post("http://localhost:8888/api/login", credentials)
                .then(function (res) {
                    UserService.setUser(res.data.user);
                    Session.create(res.data.id, res.data.user.id, res.data.user.role);
                    return res.data.user;
                });
        };

        authService.logout = function () {
             Session.destroy();
        };

        authService.isAuthenticated = function () {
            return !!Session.get() && !!Session.get().userId;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            
            return (!!Session.get() && authService.isAuthenticated() &&  authorizedRoles.indexOf(Session.get().userRole) !== -1);
        };

        return authService;
    };

    UserService.$inject = ["$sessionStorage"];
    function Session($sessionStorage) {
        var vm = {};
        var cookieSet = $sessionStorage;
        var session = {};

        vm.create = function (sessionId, userId, userRole) {
            session.id = sessionId;
            session.userId = userId;
            session.userRole = userRole;
            cookieSet.$default({session:  session});
        };

        vm.destroy = function () {
            cookieSet.$reset();
            
        };

        vm.get = function () {
            return cookieSet.$default().session;
        };

        return vm;
    };

    AuthInterceptor.$inject = ["$rootScope", "$q","AUTH_EVENTS"];
    function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    };

    AuthResolver.$inject = ["$rootScope", "$q","$state", "UserService"];
    function AuthResolver($rootScope, $q, $state, UserService) {
       $rootScope.currentUser = UserService.getUser();

        return {
            resolve: function () {
                var deferred = $q.defer();
                var unwatch = $rootScope.$watch("currentUser", function (currentUser) {
                    if (angular.isDefined(currentUser)) {
                        if (currentUser) {
                            deferred.resolve(currentUser);
                        } else {
                            deferred.reject();
                            $state.go('login');
                        }
                        unwatch();
                    }
                });
                return deferred.promise;
            }
        };
    };

    UserService.$inject = ["$sessionStorage"];
    function UserService($sessionStorage) {
        var cookieSet = $sessionStorage;
    
        var setUser = function(val) {
            cookieSet.$default({user:  val});
        };
    
        var getUser = function(){
            return  cookieSet.$default().user;
        };

        return {
            setUser : setUser,
            getUser : getUser
        };
    
    };

})();



