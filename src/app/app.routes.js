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
            controller: 'HomeController',
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
            controller: 'devPortfolioCtrl',
            templateUrl:"devstudio/devportfolio/devportfolio.tmpl.html"
        })
        .state("home.ordercustomer", {
            url: "ordercustomer",
            templateUrl:"devstudio/order/orderCustomers.tmpl.html"
        })
        .state("home.vacancies", {
            url: "vacancies",
            templateUrl:"devstudio/vacancies/vacancies.tmpl.html",
        })
        .state("home.intportfolio", {
            url: "internship-portfolio",
            templateUrl:"internship/portfolio/intPortfolio.tmpl.html",
            controller: 'intPortfolioCtrl'
        })
        .state("home.reviews", {
            url: "reviews",
            templateUrl:"internship/reviews/reviews.html"
        })
        .state("home.training", {
            url: "training",
            templateUrl:"internship/training/training.html"
        })
        .state("home.addvacancy", {
            url: "addvacancy",
            templateUrl:"devstudio/addVacancy/addVacancy.tmpl.html"
        })
        .state("home.addreview", {
            url: "addreview",
            templateUrl:"internship/addReview/addreview.tmpl.html"
        })
        .state("home.addportfoliodev", {
            url: "addportfoliodev",
            templateUrl:"devstudio/devportfolio/addportfolio.tmpl.html"
        })
        .state("home.addportfolioint", {
            url: "addportfolioint",
            templateUrl:"internship/portfolio/intAddportfolio.tmpl.html"
        })
   
});

