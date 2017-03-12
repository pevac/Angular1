"use strict";

const browserSync = require("browser-sync").create();
const spa         = require("browser-sync-spa");
const config = require("./config");


module.exports =  function(options){
    return function(){
        browserSync.init({
            server: {
                baseDir: config.path.server,
                directory: true
            },
            ui: {
                port: 8889
            },
            port: 8888,
            open: true,
            notify: false,
            ghostMode: false,
            logFileChanges: true
        });

        browserSync.watch(config.path.watch.reload).on("change", browserSync.reload);

        browserSync.use(spa({
            selector: "[ng-app]",
            history: {
                index: config.path.server + '/index.html'
            }
        }));
    }
}