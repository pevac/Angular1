(function() {
  "use strict";

  angular
    .module("appModule")
    .config(config);

  config.$inject = ["$logProvider"];
  function config($logProvider) {
    $logProvider.debugEnabled(true);
  }

})();
