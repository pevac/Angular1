(function(){
    "use strict";
    angular.module("loginModule")
        .factory("AuthService", AuthService )
        .service("Session", Session)
        .factory("IdleService", IdleService)
        .factory("AuthInterceptor", AuthInterceptor)
        .factory("AuthResolver",AuthResolver)
        .factory('UserService', UserService)
        .factory("IdleResolver", IdleResolver);

    AuthService.$inject = ["$http", "Session","UserService", "IdleService", "$q"];
    function AuthService($http, Session, UserService, IdleService, $q) {
        var authService = {};

        // authService.login = function (credentials) {
        //     return $http
        //         .post("http://localhost:8888/api/login", credentials)
        //         .then(function (res) {
        //             if(res.token) {
        //                 $http.defaults.headers.common["X-CSRF-Token"] = res.token;
        //                 Session.create(res.data.id, res.token, res.data.user.id, res.data.user.role);
        //                 UserService.setUser(res.data.user);
        //             }
        //             return res;
        //         });
        // };

        authService.login = function (credentials) {
            var session = {token: "sfdfdsfdsf"};
            session.data = {
                id: 45,
                user: {
                    id: 23,
                    role: "admin",
                    userName: "ivan1",
                    avatar: "./assets/img/admin.jpg"
                }
            };
           
            var deferred = $q.defer();
            if (angular.isDefined(session)) {
                if (session) {
                    deferred.resolve(session);
                } else {
                    deferred.reject();
                }
            }
            var res = deferred.promise.$$state.value;
            if(res&&res.token) {
                $http.defaults.headers.common["X-CSRF-Token"] = res.token;
                Session.create(res.data.id, res.token, res.data.user.id, res.data.user.role);
                UserService.setUser(res.data.user);
                IdleService.startTimer();
            }
            return deferred.promise;
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
                            $state.go("login");
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

    IdleService.$inject = ["$rootScope", "$timeout", "$log", "AUTH_EVENTS", "$sessionStorage"];
    function IdleService($rootScope, $timeout, $log, AUTH_EVENTS, $sessionStorage) {
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



