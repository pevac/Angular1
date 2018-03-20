(function(){
    "use strict";
    angular.module("loginModule")
        .factory("AuthService", AuthService )
        .factory("IdleService", IdleService)
        .factory("AuthInterceptor", AuthInterceptor)
        .factory("AuthRequired",AuthRequired)
        .factory("SkipIfLoggedIn",SkipIfLoggedIn)
        .factory('UserService', UserService)
        .factory("IdleResolver", IdleResolver);    
      

    AuthService.$inject = ["$auth", "UserService", "IdleService"];
    function AuthService($auth, UserService, IdleService) {
        var authService = {};

        authService.login = function (credentials) {
           return $auth.login(credentials)
              .then(function(response) {
                UserService.setUser(response.data.user);
                IdleService.startTimer();
                return response;
               })
        };

        authService.logout = function () {
            $auth.removeToken();
        };

        authService.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() && 
                        (authorizedRoles.indexOf(UserService.getUser().role) !== -1 ||  authorizedRoles.indexOf("*") !== -1  ));
        };

        return authService;
    }

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
    }

    AuthRequired.$inject = ["$q","$state", "AuthService"];
    function AuthRequired( $q, $state, AuthService) {
        return {
            resolve: function () {
                var deferred = $q.defer();
                    if (angular.isDefined(AuthService)) {
                        if (AuthService.isAuthenticated()) {
                            deferred.resolve(AuthService.isAuthenticated());
                        } else {
                            deferred.reject();
                            $state.go("login");
                        }
                    }
                return deferred.promise;
            }
        };
    }

    SkipIfLoggedIn .$inject = ["$q","$state", "AuthService"];
    function SkipIfLoggedIn ( $q, $state, AuthService) {
        return {
            resolve: function () {
                var deferred = $q.defer();
                    if (angular.isDefined(AuthService)) {
                        if (AuthService.isAuthenticated()) {
                            deferred.reject();
                        } else {
                            deferred.resolve();
                        }
                    }
                return deferred.promise;
            }
        };
    }

    IdleResolver.$inject = ["$q","$state", "UserService", "IdleService"];
    function IdleResolver( $q, $state, UserService, IdleService) {
        return {
            resolve: function () {
                var idle = IdleService.getIdle();
               
                var deferred = $q.defer();
                    if (angular.isDefined(idle)) {
                        if (!idle) {
                            deferred.resolve(idle);
                        } else {
                            deferred.reject();
                            $state.go("login");
                        }
                    }
                return deferred.promise;
            }
        };
    }

    UserService.$inject = ["$sessionStorage"];
    function UserService($sessionStorage) {
        var setUser = function(val) {
            $sessionStorage.user = val;
        };
    
        var getUser = function(){
            return  $sessionStorage.user;
        };

        return {
            setUser : setUser,
            getUser : getUser
        };
    
    }

    IdleService.$inject = ["$rootScope", "$timeout", "$log", "AUTH_EVENTS"];
    function IdleService($rootScope, $timeout, $log, AUTH_EVENTS) {
        var idleTimer = null;
        var isIdle = false;

        var   startTimer = function () {
                $log.log("Starting timer");
                isIdle = true;
                idleTimer = $timeout(timerExpiring, 50000);
        };
        var  stopTimer = function () {
                if (idleTimer) {
                    isIdle = false;
                    $timeout.cancel(idleTimer);
                }
        };
        var resetTimer = function () {
                stopTimer();
                startTimer();
        };
        var timerExpiring = function () {
                stopTimer();
                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
                $log.log("Timer expiring ..");
        };

        var getIdle = function() {
            return isIdle;
        }
     
        return {
            startTimer: startTimer,
            stopTimer: stopTimer,
            resetTimer: resetTimer,
            getIdle: getIdle
        }
    }

})();



