"use strict";

const taskDir = "gulp";
const gulp = require("gulp");
const sequence  = require("run-sequence");
const $ = require("gulp-load-plugins")();
const task = require("./loader")(gulp, taskDir);
const config = require("./config")

task("styles:tmp",  { src: config.src,  build: config.tmp });
task("templates:tmp",  { src: config.src, build: config.tmp });
task("eslint",  { src: config.src });
task("fonts:build",  { src: config.src, build: config.build });
task("images:build",  { src: config.src, build: config.build });
task("inject:tmp",  { src: config.src, build: config.tmp });
task("useref:tmp",  { src: config.tmp, build: config.build });
task("server:tmp",  { server: config.server.tmp });
task("server:dist",  { server: config.server.dist });
task("watch:tmp",  { watch: config.watch });
task("clean",  { clean: config.clean.file} );
task("clear.cache");

task("war", { war: config.war });
task("unit.tests:single", {singleRun: true});
task("unit.tests:single:auto", {singleRun: false});
task("e2e.tests");

gulp.task("war:build",["clean"], (cb) => {
    sequence ( "useref:build", "war", cb);
});
gulp.task("test", (cb) => {
    sequence ( "eslint", "unit.test:single", cb);
});
gulp.task("test:auto", (cb) => {
    sequence ( "watch:tmp", "unit.test:single:auto", cb);
});
gulp.task("protractor", ["protractor:src"]);
gulp.task("protractor:src",(cb) => {
    sequence ( ["serve:e2e", "webdriver-update"], "e2e.tests", cb);
});
gulp.task("protractor:dist",  (cb) => {
    sequence ( ["serve:e2e-dist", "webdriver-update"], "e2e.tests", cb);
});
gulp.task("webdriver-update", $.protractor.webdriver_update);
gulp.task("webdriver-standalone", $.protractor.webdriver_standalone);

gulp.task("inject", (cb) => {
    sequence (["styles:tmp", "eslint"],"inject:tmp", cb);
});
gulp.task("inject:build", (cb) => {
    sequence (["clear.cache", "clean"], "inject", cb);
});
gulp.task("useref:build", (cb) => {
    sequence ("inject:build", [ "templates:tmp", "fonts:build","images:build"],"useref:tmp", cb);
});

gulp.task("serve",  function (cb) {
    sequence ("inject:build",  ["server:tmp","watch:tmp"], cb);
});
gulp.task("serve:dist", function (cb) {
    sequence ("useref:build",  "server:dist", cb);
});
gulp.task("serve:e2e", function (cb) {
    sequence ("inject:build",  "server:tmp", cb);
});
gulp.task("serve:e2e-dist", function (cb) {
    sequence ("useref:build",  "server:dist", cb);
});

gulp.task("default", ["serve"]);


// task("styles:build", path.resolve("./gulp/styles"), {
//     src: config.src,
//     build: config.build
// });
// task("vendor:build", path.resolve("./gulp/vendor"), {
//     src: config.src,
//     build: config.build
// });
// task("app:build", path.resolve("./gulp/app"), {
//     src: config.src,
//     build: config.build
// });
// task("templates:build", path.resolve("./gulp/templates"), {
//     src: config.src,
//     build: config.build
// });
// task("html:build", path.resolve("./gulp/html"), {
//     src: config.src,
//     build: config.build
// });
// task("watch", path.resolve("./gulp/watch"), {
//     watch: config.watch
// });
// gulp.task("serve:dist:watch",  (cb) => {
//     sequence ("build",  ["server:dist","watch"], cb);
// });
// gulp.task("build", (cb) => {
//     sequence ( ["clear.cache", "clean"], ["styles:build","templates:build", "vendor:build", "app:build",  "fonts:build","images:build"],"html:build", cb);
// });
