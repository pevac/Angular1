(function(){
    angular.module("angularApp")
        .factory('AuthService', AuthService )
        .service('Session', Session)
        .factory('AuthInterceptor', AuthInterceptor)
        .factory('AuthResolver',AuthResolver)
        .config(requestProvider)
        .run(initLogin)
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            guest: 'guest'
        });


    function initLogin($rootScope, AUTH_EVENTS, AuthService, $location) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {

                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    $location.path('/login');
                }
                // event.preventDefault();
            }
        });
    }

    function AuthService($http, Session) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('http://localhost:8080/api/login', credentials)
                .then(function (res) {
                    console.log(res);
                    Session.create(res.data.id, res.data.user.id, res.data.user.role);
                    return res.data.user;
                });
        };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;
    };

    function Session() {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    };

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

    function AuthResolver($q, $rootScope, $state) {
        return {
            resolve: function () {
                var deferred = $q.defer();
                var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
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

    function requestProvider($httpProvider)  {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }

    // angular.module("angularApp").factory('user', function() {
    //     var cookieSet;
    //
    //     var addCookie = function(val) {
    //         cookieSet=val;
    //     }
    //
    //     var getCookie = function(){
    //         return cookieSet;
    //     }
    //
    //     return {
    //         addCookie : addCookie,
    //         getCookie : getCookie
    //     };
    //
    // });

})();



