"use strict";

const browserSync = require("browser-sync").create();
const spa         = require("browser-sync-spa");
const isArray     = require("isarray");
const proxyMiddleware = require("http-proxy-middleware");

module.exports =  (options) => {
    return () => {
        options.server.browser === undefined ? "default" : options.server.browser;
        
        let routes = null;
        if(options.server.path === "src" || 
            (isArray(options.server.path) && options.server.path.indexOf("src") !== -1)) {
            routes = {
              "/node_modules": "node_modules"
            };
        }

        let server = {
            baseDir: options.server.path,
            directory: true,
            routes:routes
        }

        server.middleware = proxyMiddleware("/dev-studio/", {
            target: "http://localhost:3001", 
            pathRewrite: {
                "/dev-studio/api" : "/api",     // rewrite path
                "/dev-studio/auth" : "/auth"           // remove base path
            },
            changeOrigin: true
        });

        browserSync.instance = browserSync.init({
            server: server,
            ui: {
                port: 8081
            },
            port: 8080,
            startPath: "/",
            open: true,
            injectChanges: true,
            ghostMode: false,
            notify: true,
            reloadDelay: 800,
            logFileChanges: true
        });

        browserSync.watch(options.server.watch).on("change", browserSync.reload);

        browserSync.use(spa({
            selector: "[ng-app]",
            history: {
                index: options.server.path + "/index.html"
            }
        }));
    }
}