(function(){
    "use strict";
    angular.module("loginModule")
        .config(RequestProvider)
        .config(AuthProvider);

    RequestProvider.$inject = ["$httpProvider"];
    function RequestProvider($httpProvider)  {
        $httpProvider.interceptors.push([
            "$injector",
            function ($injector) {
                return $injector.get("AuthInterceptor");
            }
        ]);
    }

    AuthProvider.$inject = ["$authProvider", "serverAuthConstant"];
    function AuthProvider($authProvider, serverAuthConstant)  {
        $authProvider.httpInterceptor = function() { return true; },
        $authProvider.withCredentials = false;
        $authProvider.tokenRoot = null;
        $authProvider.baseUrl = "/";
        $authProvider.loginUrl = serverAuthConstant.loginUrl;
        $authProvider.signupUrl = "/auth/signup";
        $authProvider.unlinkUrl = "/auth/unlink/";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "satellizer";
        $authProvider.tokenHeader = "Authorization";
        $authProvider.tokenType = "Bearer";
        $authProvider.storageType = "sessionStorage";
    }

})();