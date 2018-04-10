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

function isFunction(value) { return typeof value === 'function'; }
function isObject(value) { return value !== null && typeof value === 'object'; }
function isString(value) {return typeof value === 'string';}
function isArray(arr) { return Array.isArray(arr) || arr instanceof Array; }


module.exports =  (gulp, taskDir = "gulp") => {
    return function lazyLoad() {
        let tasks = [];
        const taskName = arguments[0];
        const options = !isFunction(arguments[1])&&isObject(arguments[1]) ? arguments[1] : isObject(arguments[2]) ?  arguments[2] : {};
        options.taskName = taskName;

        const  lazyLoadTask = (done) => {
            const modules = requireModules(gulp);
            const plugins = modules.plugins;
            const filePath = plugins.path.resolve(taskDir, taskName.split(":")[0]);
        
            const task = require(filePath).call(this, options, plugins);
            return task(done);
        }

        try {
            if(arguments.length === 0 ){
                throw  Error("Missing arguments");
            }
    
            if( arguments[0] === null|| arguments[0] === undefined || !(isString(arguments[0]) && (arguments[0].trim() !== "")) ){
                throw  Error("Missing task name");
            }

            if((arguments.length === 2) && (arguments[1] === null || arguments[1] === undefined || isString(arguments[1])) &&
                !(isFunction(arguments[1]) || isArray(arguments[1]) || isObject(arguments[1]) )) {
                throw  Error("Failed arguments");
            }

            if((arguments.length === 3) && (arguments[1] === null || arguments[1] === undefined || isString(arguments[1]))
                && !(isFunction(arguments[1]) || isArray(arguments[1]) || isObject(arguments[1])) 
                &&(arguments[2] === null || arguments[2] === undefined || isString(arguments[2])) 
                &&!(isFunction(arguments[1]) || isArray(arguments[1])) )
            {
                throw  Error("Failed arguments");
            }

        } catch (e) {
            console.error(e.message);
            throw  Error(e.message);
        }

       

        if(arguments.length ===1){
            tasks.push(lazyLoadTask);
        }else if(arguments.length ===2) {
            if(isFunction(arguments[1])){
                tasks.push(arguments[1]);
            } else if(isArray(arguments[1])){
                tasks.push(gulp.parallel(...arguments[1]));
            }else if(isObject(arguments[1])){
                tasks.push(lazyLoadTask);
            }
        } else if(arguments.length === 3) {
            if(isObject(arguments[1])&&isFunction(arguments[2])){
                tasks.push(arguments[2], lazyLoadTask);
            } else if(isArray(arguments[1])&&isFunction(arguments[2])){
                tasks.push(gulp.parallel(...arguments[1]), arguments[2]);
            }else if(isObject(arguments[1])&&isArray(arguments[2])){
                tasks.push(gulp.parallel(...arguments[2]), lazyLoadTask);
            }
        }

        return gulp.task(taskName, gulp.series(...tasks));
    }
};