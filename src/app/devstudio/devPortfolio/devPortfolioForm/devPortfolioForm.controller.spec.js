(function(){
    describe("devPortfolioForm controller", function() {
        var vm;
        var scope;

        beforeEach(angular.mock.module("appModule"));
        beforeEach(angular.mock.module("devPortfolioModule"));
        beforeEach(angular.mock.inject(function($controller, $httpBackend, $rootScope, $compile, $templateCache) {
            scope = $rootScope.$new();
            vm = $controller("AddDevPortfolioController",{ $scope: scope});
        }));

        it("should  controller to be defined", function() {
            expect(vm).toBeDefined();
        });

        it("should  controller to be date options", function() {
            expect(vm.dateOptions).toBeDefined();
        });
        
  
    });
})();


