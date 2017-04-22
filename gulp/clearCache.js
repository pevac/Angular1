"use strict";

const cache = require("gulp-cache");

module.exports =  (options) => {
    return   (done) => {
        return cache.clearAll(done);
    }
}