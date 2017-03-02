"use strict";
 
const gulp = require("gulp");

module.exports = function loadTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);
 
        return task(callback);
    })
};