(function() {
    "use strict";
  
    angular
      .module("appModule")
      .run(runBlock);
  
    runBlock.$inject = ["$log"];
    function runBlock($log) {
  
      $log.debug("runBlock end");
    }
  
  })();