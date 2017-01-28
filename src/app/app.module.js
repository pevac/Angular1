 (function(){
     angular.module("angularApp", ["ui.bootstrap", "bu.validation", "ngSanitize","smart-table", "ngFileSaver", "ui.router", "angularTrix",  "serverApi",  "fileReaderModule", "devPortfolioModule", "intPortfolioModule", "orderCustomerModule", "vacancyModule",   "reviewsModule", 'usersModule'])


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
         .run([ "$locale",function ($locale) {
             $locale.DATETIME_FORMATS.MONTH = [
                 "\u0441\u0456\u0447\u0435\u043d\u044c",
                 "\u043b\u044e\u0442\u0438\u0439",
                 "\u0431\u0435\u0440\u0435\u0437\u0435\u043d\u044c",
                 "\u043a\u0432\u0456\u0442\u0435\u043d\u044c",
                 "\u0442\u0440\u0430\u0432\u0435\u043d\u044c",
                 "\u0447\u0435\u0440\u0432\u0435\u043d\u044c",
                 "\u043b\u0438\u043f\u0435\u043d\u044c",
                 "\u0441\u0435\u0440\u043f\u0435\u043d\u044c",
                 "\u0432\u0435\u0440\u0435\u0441\u0435\u043d\u044c",
                 "\u0436\u043e\u0432\u0442\u0435\u043d\u044c",
                 "\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434",
                 "\u0433\u0440\u0443\u0434\u0435\u043d\u044c"]
         }]);
 })();





