const $ = require("gulp-load-plugins")();

const bowerComponent = require("../vendor");

exports.AUTOPREFIXER_BROWSERS = [             
    "ie >= 9",
    "ie_mob >= 9",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 5",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
];

const MODULE_NAME = "appModule";
const SOURCE_BASE_DIR = "./src";
const TARGET_DIR = "./build";
const BUILD_BASE_DIR = TARGET_DIR;
const PROXY_PATHS = BUILD_BASE_DIR;

exports.path = {
    build: { 
        script: BUILD_BASE_DIR + "/js",
        styles: BUILD_BASE_DIR + "/css",
        fonts: BUILD_BASE_DIR + "/fonts",
        img: BUILD_BASE_DIR + "/img",
        index : BUILD_BASE_DIR + "/",
        templates : {
            dir : BUILD_BASE_DIR + "/js",
            name : "templateCacheHtml.js",
            rootPath : "",
            module: MODULE_NAME
        },
    },
    src: { 
        templates: [ SOURCE_BASE_DIR + '/app/**/*.html' ],
        script: {
            app: [ SOURCE_BASE_DIR + '/app/**/*.js' ],
            vendor: bowerComponent
        },
        styles: SOURCE_BASE_DIR + "/assets/sass/*.scss",
        fonts: [SOURCE_BASE_DIR + "/assets/fonts/**/*.*", "./src/assets/lib/bootstrap-sass/assets/fonts/**/*.*"],
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        index : SOURCE_BASE_DIR + "/index.html"
    },
    watch: { 
        templates: SOURCE_BASE_DIR + "/app/**/*.html",
        views: SOURCE_BASE_DIR + '/app/**/*.html',
        script: SOURCE_BASE_DIR + "/app/**/*.js",
        styles: SOURCE_BASE_DIR + "/assets/sass/**/*.scss",
        fonts: SOURCE_BASE_DIR + "/assets/fonts/**/*.*",
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        index : SOURCE_BASE_DIR + "/index.html",
        reload: BUILD_BASE_DIR + "/**/*.*"
    },
    zip: {
        src: BUILD_BASE_DIR  + "/**/*.*",
        dest: "./"
    },
    clean: {build: BUILD_BASE_DIR,
        war: "./admin.war",
    },
    server: PROXY_PATHS
};

exports.reportError = function reportError(error) {
    var lineNumber = (error.line) ? "LINE " + error.line + " -- " : "";
    var pluginName = (error.plugin) ? ": ["+error.plugin+"]" : "["+currentTask+"]";
 
    $.notify({
        title: "Task Failed "+ pluginName,
        message: lineNumber + "See console.",
        sound: false
    }).write(error);

    var report = "";
    var chalk = $.util.colors.white.bgRed;
 
    report += chalk("TASK:") + pluginName+"\n";
    report += chalk("ERROR:") + " " + error.message + "\n";
    if (error.line) { report += chalk("LINE:") + " " + error.line + "\n"; }
    if (error.file) { report += chalk("FILE:") + " " + error.file + "\n"; }
 
    console.error(report);
    this.emit("end");
}