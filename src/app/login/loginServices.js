angular.module("angularApp").factory('AuthService', AuthService );



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



angular.module("angularApp").factory('AuthResolver', function ($q, $rootScope, $state) {
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
})

angular.module("angularApp").config(function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
})

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



