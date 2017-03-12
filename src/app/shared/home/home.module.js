(function(){
    "use strict";

    angular.module("homeModule", [ "devPortfolioModule", "intPortfolioModule", "orderCustomerModule", "vacancyModule", 
        "reviewsModule", "usersModule", "sidebarModule", "dictionariesModule"]);

    angular.module("homeModule")
        .run(LocalDateTime);

    LocalDateTime.$inject = ["$locale"];
    function LocalDateTime($locale) {
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
    }

})();