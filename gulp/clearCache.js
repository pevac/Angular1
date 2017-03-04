"use strict";

const cache = require("gulp-cache");

module.exports =  function(options){
    return  function (done) {
        return cache.clearAll(done);
    }
}