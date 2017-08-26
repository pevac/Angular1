(function(){
    "use strict";
    angular.module("loginModule")
        .factory("AuthService", AuthService )
        .service("Session", Session)
        .factory("AuthInterceptor", AuthInterceptor)
        .factory("AuthResolver",AuthResolver)
        .factory('UserService', UserService)
        .factory("IdleService", IdleService);

    AuthService.$inject = ["$http", "Session","UserService", "IdleService"];
    function AuthService($http, Session, UserService, IdleService) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post("http://localhost:8888/api/login", credentials)
                .then(function (res) {
                    if(res.token) {
                        $http.defaults.headers.common["X-CSRF-Token"] = res.token;
                        Session.create(res.data.id, res.token, res.data.user.id, res.data.user.role);
                        UserService.setUser(res.data.user);
                        IdleService.startTimer();
                        return true;
                    }
                    return false;
                });
        };

        authService.logout = function () {
            Session.destroy();
            $http.defaults.headers.common["X-CSRF-Token"] = "";
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
    }

    Session.$inject = ["$sessionStorage", "$q"];
    function Session($sessionStorage, $q) {
        var vm = {};
        var cookieSet = $sessionStorage;

        vm.create = function (sessionId, token, userId, userRole) {
            var session = {};
            session.id = sessionId;
            session.userId = userId;
            session.userRole = userRole;
            session.csrftoken = token;
            cookieSet.$default({session:  session});
        };

        vm.destroy = function () {
            cookieSet.$reset();
        };

        vm.getAsync = function () {
            var session =  cookieSet.$default().session;
            var deferred = $q.defer();
            if (angular.isDefined(session)) {
                if (session) {
                    deferred.resolve(session);
                } else {
                    deferred.reject();
                }
            }
            return deferred.promise;
        };

        vm.get= function () {
            return cookieSet.$default().session;
        };


        return vm;
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

    AuthResolver.$inject = ["$q","$state", "UserService"];
    function AuthResolver( $q, $state, UserService) {

        return {
            resolve: function () {
                var currentUser = UserService.getUser();
               
                var deferred = $q.defer();
                    if (angular.isDefined(currentUser)) {
                        if (currentUser) {
                            deferred.resolve(currentUser);
                        } else {
                            deferred.reject();
                            $state.go('login');
                        }
                    }
                return deferred.promise;
            }
        };
    }

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
    
    }

    IdleService.$inject = ["$rootScope", "$timeout", "$log", "AUTH_EVENTS"];
    function IdleService($rootScope, $timeout, $log, AUTH_EVENTS) {
        var idleTimer = null;
        var   startTimer = function () {
                $log.log("Starting timer");
                idleTimer = $timeout(timerExpiring, 50000);
        };
        var  stopTimer = function () {
                if (idleTimer) {
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
     
        return {
            startTimer: startTimer,
            stopTimer: stopTimer,
            resetTimer: resetTimer
        }
    }

})();



