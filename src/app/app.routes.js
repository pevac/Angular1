(function(){
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
            template:'<div ng-app="devPortfolioModule"  ui-view ></div>'
        })
        .state("home.devportfolio.list", {
            url: "/list",
            controller: 'devPortfolioListCtrl',
            templateUrl:"devstudio/devportfolio/list-devportfolio/list-devportfolio.tmpl.html"
        })
        .state("home.devportfolio.addportfolio", {
            url: "/add",
            controller: "addDevPortfolioCtrl",
            templateUrl:"devstudio/devportfolio/form-devportfolio/form-devportfolio.tmpl.html"
        })
        .state("home.devportfolio.editportfolio", {
            url: "/edit?project",
            controller: "addDevPortfolioCtrl",
            templateUrl:"devstudio/devportfolio/form-devportfolio/form-devportfolio.tmpl.html"
        })
        .state("home.devportfolio.viewportfolio", {
            url: "/view?project",
            templateUrl:"devstudio/devportfolio/view-devportfolio/view-devportfolio.tmpl.html"
        })

        .state("home.ordercustomer", {
            url: "ordercustomer",
            template:'<div ng-app="orderCustomerModule"  ui-view ></div>'
        })
        .state("home.ordercustomer.list", {
            url: "/list",
            templateUrl:"devstudio/order/list-order/order-customers.tmpl.html",
            controller: "orderCustomerCtrl"
        })
        .state("home.ordercustomer.view", {
            url: "/view?orderId",
            templateUrl:"devstudio/order/view-order/view-order.tpml.html",
            controller: "viewOrderCustomerCtrl"
        })

        .state("home.vacancies", {
            url: "vacancies",
            template:'<div ng-app="vacancyModule"  ui-view ></div>'
        })
        .state("home.vacancies.list", {
            url: "/list",
            templateUrl:"devstudio/vacancies/list-vacancies/vacancies.tmpl.html",
            controller: "vacanciesController"
        })
        .state("home.vacancies.addvacancy", {
            url: "/add",
            templateUrl:"devstudio/vacancies/add-vacancy/addvacancy.tmpl.html",
            controller: "addVacancyCtrl"
        })
        .state("home.vacancies.edit", {
            url: "/edit?vacancy",
            templateUrl:"devstudio/vacancies/add-vacancy/addvacancy.tmpl.html",
            controller: "addVacancyCtrl"
        })
        .state("home.vacancies.review", {
            url: "^/review/list",
            templateUrl:"devstudio/vacancies/review-vacancies/review-vacancies.tmpl.html",
            controller: "reviewVacanciesController"
        })

        .state("home.intportfolio", {
            url: "internship-portfolio",
            template:'<div ng-app="intPortfolioModule"  ui-view ></div>'
        })
        .state("home.intportfolio.list", {
            url: "/list",
            controller: 'intPortfolioListCtrl',
            templateUrl:"internship/intportfolio/list-intportfolio/list-intportfolio.tmpl.html"
        })
        .state("home.intportfolio.addportfolio", {
            url: "/add",
            controller: "addIntPortfolioCtrl",
            templateUrl:"internship/intportfolio/form-intportfolio/form-intportfolio.tmpl.html"
        })
        .state("home.intportfolio.editportfolio", {
            url: "/edit?project",
            controller: "addIntPortfolioCtrl",
            templateUrl:"internship/intportfolio/form-intportfolio/form-intportfolio.tmpl.html"
        })


        .state("home.reviews", {
            url: "reviews",
            template:'<div ng-app="reviewsModule"  ui-view ></div>'
        })
        .state("home.reviews.list", {
            url: "/list",
            templateUrl:"internship/reviews/listreview/reviews.html"
        })
        .state("home.reviews.addreview", {
            url: "/add",
            templateUrl:"internship/reviews/add-review/addreview.tmpl.html"
        })
        .state("home.reviews.editreview", {
            url: "/edit?review",
            templateUrl:"internship/reviews/add-review/addreview.tmpl.html"
        })


        .state("home.training", {
            url: "training",
            templateUrl:"internship/training/training.html"
        })


});
})();



