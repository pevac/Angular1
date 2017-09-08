"use strict";
 
const gulp = require("gulp");

module.exports = (taskName, path, options) => {
    options = options || {};
    options.taskName = taskName;

    gulp.task(taskName,  (callback) => {
        let task = require(path).call(this, options);
        return task(callback);
    })
};