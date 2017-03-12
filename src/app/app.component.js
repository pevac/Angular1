(function(){
    "use strict";
    angular.module("appModule")
        .component("app", {
            template: '<div class="main-view" ui-view ></div>'
        });
})();