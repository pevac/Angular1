angular.module("angularApp").config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "login/login.html",
        })
        .state("home", {
            abstract: false,
            url: "/",
            templateUrl: "components/home/home.html" 
        })
        .state("home.devportfolio", {
            url: "devportfolio",
           templateUrl:"devstudio/devportfolio/devportfolio.html"
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

