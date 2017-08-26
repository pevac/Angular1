"use strict";

const browserSync = require("browser-sync").create();
const spa         = require("browser-sync-spa");
const isArray     = require("isarray");

const config = require("./config");


module.exports =  (options) => {
    return () => {
        options.browser === undefined ? "default" : browser;
        
        var routes = null;
        if(config.path.server === config.path.src.root || 
            (isArray(config.path.server) && config.path.server.indexOf(config.path.src.root) !== -1)) {
            routes = {
              "/node_modules": "node_modules"
            };
            
        }

        browserSync.init({
            server: {
                baseDir: config.path.server,
                directory: true,
                routes:{
                    "/node_modules": "node_modules"
                  }
            },
            ui: {
                port: 8081
            },
            port: 8080,
            open: true,
            injectChanges: true,
            ghostMode: false,
            notify: true,
            reloadDelay: 800,
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