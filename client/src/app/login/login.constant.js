(function(){
    "use strict";
    angular.module("loginModule")
        .constant("AUTH_EVENTS", {
            loginSuccess: "auth-login-success",
            loginFailed: "auth-login-failed",
            logoutSuccess: "auth-logout-success",
            sessionTimeout: "auth-session-timeout",
            notAuthenticated: "auth-not-authenticated",
            notAuthorized: "auth-not-authorized"
        })
        .constant("USER_ROLES", {
            all: "*",
            admin: "admin",
            expert: "expert"
        })
        .constant("serverAuthConstant",function(){
            // var rootUrl = "http://www.edu.bionic-university.com:2101/dev-studio/";
            var rootUrl = "/dev-studio/";
            return {
                loginUrl: rootUrl +  "auth/login",
            }
        }());
})();