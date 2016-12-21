 (function(){
     angular.module("angularApp", ["ui.bootstrap", "bu.validation", "smart-table", "ngFileSaver", "ui.router", "angularTrix",  "serverApi",  "fileReaderModule", "devPortfolioModule", "intPortfolioModule", "orderCustomerModule", "vacancyModule",   "reviewsModule", 'usersModule'])

         .run(["$templateCache", function($templateCache) {
             $templateCache.put("pagination/pagination.html",
                 "<nav ng-if=\"numPages && pages.length >= 2\"><ul class=\"pagination\">\n" +
                 "<li  ng-class=\"{disabled: currentPage === 1 ||ngDisabled}\" class=\"pagination-first\"><a href=\"javascript: void(0);\" ng-click=\"selectPage(1, $event)\" ng-disabled=\"currentPage === 1 || ngDisabled\" uib-tabindex-toggle><<</a></li>\n" +
                 "<li  ng-class=\"{disabled: currentPage === 1||ngDisabled}\" class=\"pagination-prev\"><a href=\"javascript: void(0);\" ng-click=\"selectPage(currentPage - 1, $event)\" ng-disabled=\"currentPage === 1 || ngDisabled\" uib-tabindex-toggle><</a></li>\n" +
                 "<li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page==currentPage,disabled: ngDisabled&&!page.active}\" class=\"pagination-page\"><a href=\"javascript: void(0);\" ng-click=\"selectPage(page, $event)\" ng-disabled=\"ngDisabled&&!page.active\" uib-tabindex-toggle>{{page}}</a></li>\n" +
                 "<li  ng-class=\"{disabled: currentPage === numPages ||ngDisabled}\" class=\"pagination-next\"><a href=\"javascript: void(0);\" ng-click=\"selectPage(currentPage + 1, $event)\" ng-disabled=\"currentPage === numPages || ngDisabled\" uib-tabindex-toggle>></a></li>\n" +
                 "<li  ng-class=\"{disabled: currentPage ===numPages ||ngDisabled}\" class=\"pagination-last\"><a href=\"javascript: void(0);\" ng-click=\"selectPage(numPages, $event)\" ng-disabled=\"currentPage === numPages ||ngDisabled\" uib-tabindex-toggle>>></a></li>\n" +
                 "</ul></nav>" +
                 "");
         }])
 })();





