angular.module("angularApp").config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "login/login.html",
            controller: 'LoginController',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state("home", {
            abstract: false,
            url: "/",
            templateUrl: "components/home/home.html",
            controller: 'homeCtrl',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            },
            resolve: {
                auth: function resolveAuthentication(AuthResolver) {
                    return AuthResolver.resolve();
                }
            }
        })
        .state("home.devportfolio", {
            url: "devportfolio",
            templateUrl:"devstudio/devportfolio/devportfolio.html",
            data: {
                authorizedRoles: [USER_ROLES.editor]
            },
            resolve: {
                auth: function resolveAuthentication(AuthResolver) {
                    return AuthResolver.resolve();
                }
            }
        })
        .state("home.ordercustomer", {
            url: "ordercustomer",
            templateUrl:"devstudio/order/orderCustomers.html"
        })
        .state("home.vacancies", {
            url: "vacancies",
            templateUrl:"devstudio/vacancies/vacancies.html"
        })
          .state("home.portfolio", {
            url: "portfolio",
           templateUrl:"internship/portfolio/portfolio.html"
        })
        .state("home.reviews", {
            url: "reviews",
            templateUrl:"internship/reviews/reviews.html"
        })
        .state("home.training", {
            url: "training",
            templateUrl:"internship/training/training.html"
        })
   
});

