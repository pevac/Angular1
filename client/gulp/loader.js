"use strict";

function requireModules(gulp) {
    
    if (requireModules.cache) {
        return requireModules.cache
    }
   
    const path = require('path');
    const util = require('./util');
    const combine = require("stream-combiner2").obj;
    const plugins = require('gulp-load-plugins')({
        config: path.resolve(path.dirname(module.parent.parent.filename), 'package.json'),
        overridePattern: false,
        pattern: ["browser-sync", "browser-sync-spa", "del", "fs", "http-proxy-middleware",
                    "uglify-save-license", "imagemin-pngquant", "minimist"]
            
    });
    plugins.combine = combine;
    plugins.gulp = gulp;
    plugins.path = path;
    plugins.util = util;
    
    return requireModules.cache = {
        plugins: plugins
    }
}

function isFunction(value) {return typeof value === 'function';}
function isObject(value) {
    return value !== null && typeof value === 'object';
  }
 


module.exports =  (gulp, taskDir = "gulp") => {
    return function lazyLoad() {
        const taskName = arguments[0];
        const options = !isFunction(arguments[1])&&isObject(arguments[1]) ? arguments[1] : isObject(arguments[2]) ?  arguments[2] : {};
        options.taskName = taskName;
        
        if(isFunction(arguments[1])){
            return gulp.task(taskName,  arguments[1] );
        }

        return gulp.task(taskName,  gulp.series((callback) => {
            const modules = requireModules(gulp);
            const plugins = modules.plugins;
            const filePath = plugins.path.resolve(taskDir, taskName.split(":")[0]);

            const task = require(filePath).call(this, options, plugins);
            return task(callback);
        }));
    }
};