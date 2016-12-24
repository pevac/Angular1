(function(){
    "use strict";
    angular.module("angularApp").config(function($stateProvider, $urlRouterProvider, USER_ROLES) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "login/login.tmpl.html",
                controller: "LoginController",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state("home", {
                abstract: false,
                url: "/",
                templateUrl: "shared/home/home.html",
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
                controller: "devPortfolioListCtrl",
                templateUrl:"devstudio/devPortfolio/devPortfolioList/devPortfolioList.tmpl.html"
            })
            .state("home.devportfolio.addportfolio", {
                url: "/add",
                controller: "addDevPortfolioCtrl",
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html"
            })
            .state("home.devportfolio.editportfolio", {
                url: "/edit?project",
                controller: "addDevPortfolioCtrl",
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html"
            })
            .state("home.devportfolio.viewportfolio", {
                url: "/view?project",
                templateUrl:"devstudio/devPortfolio/devPortfolioView/devPortfolioView.tmpl.html"
            })

            .state("home.ordercustomer", {
                url: "ordercustomer",
                template:'<div ng-app="orderCustomerModule"  ui-view ></div>'
            })
            .state("home.ordercustomer.list", {
                url: "/list",
                templateUrl:"devstudio/customersOrder/ordersList/ordersList.tmpl.html",
                controller: "orderCustomerCtrl"
            })
            .state("home.ordercustomer.view", {
                url: "/view?orderId",
                templateUrl:"devstudio/customersOrder/orderViewer/orderViewer.tpml.html",
                controller: "viewOrderCustomerCtrl"
            })

            .state("home.vacancies", {
                url: "vacancies",
                template:'<div ng-app="vacancyModule"  ui-view ></div>'
            })
            .state("home.vacancies.list", {
                url: "/list",
                templateUrl:"devstudio/vacancies/vacanciesList/vacanciesList.tmpl.html",
                controller: "vacanciesController"
            })
            .state("home.vacancies.addvacancy", {
                url: "/add",
                templateUrl:"devstudio/vacancies/vacanciesForm/vacanciesForm.tmpl.html",
                controller: "addVacancyCtrl"
            })
            .state("home.vacancies.edit", {
                url: "/edit?vacancy",
                templateUrl:"devstudio/vacancies/vacanciesForm/vacanciesForm.tmpl.html",
                controller: "addVacancyCtrl"
            })
            .state("home.vacancies.review", {
                url: "^/review/list",
                templateUrl:"devstudio/vacancies/reviewVacancies/reviewVacancies.tmpl.html",
                controller: "reviewVacanciesController"
            })

            .state("home.intportfolio", {
                url: "internship-portfolio",
                template:'<div ng-app="intPortfolioModule"  ui-view ></div>'
            })
            .state("home.intportfolio.list", {
                url: "/list",
                controller: 'intPortfolioListCtrl',
                templateUrl:"internship/intPortfolio/intPortfolioList/intPortfolioList.tmpl.html"
            })
            .state("home.intportfolio.addportfolio", {
                url: "/add",
                controller: "addIntPortfolioCtrl",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html"
            })
            .state("home.intportfolio.editportfolio", {
                url: "/edit?project",
                controller: "addIntPortfolioCtrl",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html"
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
                templateUrl:"internship/reviews/reviewForm/reviewForm.tmpl.html"
            })
            .state("home.reviews.editreview", {
                url: "/edit?review",
                templateUrl:"internship/reviews/reviewForm/reviewForm.tmpl.html"
            })

            .state("home.users", {
                url: "users",
                templateUrl:"users/list-users/list-users.tmpl.html"
            })
            .state("home.addusers", {
                url: "add",
                templateUrl:"users/form-users/form-users.tmpl.html"
            })

        

            .state("home.training", {
                url: "training",
                templateUrl:"internship/training/training.html"
            })
    });
})();

(function () {
    'use strict';

    angular.module('angularApp')
        .provider('previousState', previousStateProvider)
    .directive('back', ['$window','previousStateProvider', function ($window, previousStateProvider) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                console.log("hello");
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);

    previousStateProvider.$inject = ['$rootScopeProvider'];

    function previousStateProvider($rootScopeProvider) {
        this.$get = PreviousState;

        PreviousState.$inject = ['$rootScope'];

        /* @ngInject */
        function PreviousState($rootScope) {
            $rootScope.previousParms;
            $rootScope.previousState;
            $rootScope.currentState;

            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                $rootScope.previousParms = fromParams;
                $rootScope.previousState = from.name;
                $rootScope.currentState = to.name;
            });
        }
    }
})();



