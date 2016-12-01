angular.module("angularApp").factory('AuthService', function ($http, Session) {
    var authService = {};

    //develop
    authService.login = function (credentials) {
        return function () {
            var cred = credentials;
            if(credentials.login === "login" && credentials.password === "password") {
                Session.create(5, 4, "admin");
                return  {id: 4, role:  "admin", name: "Vasay"};
            }
            return null;

        };
    };

// normal
    // authService.login = function (credentials) {
    //     return $http
    //         .post('/api/login', credentials)
    //         .then(function (res) {
    //             Session.create(res.data.id, res.data.user.id,
    //                 res.data.user.role);
    //             return res.data.user;
    //         });
    // };

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
});

angular.module("angularApp").service('Session', function () {
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
});

angular.module("angularApp").factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
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
})

angular.module("angularApp").config(function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
})

angular.module("angularApp").factory('AuthResolver', function ($q, $rootScope, $state) {
    return {
        resolve: function () {
            var deferred = $q.defer();
            console.log($rootScope.currentUser);
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
})



