const $ = require("gulp-load-plugins")();

const bowerComponent = require("../vendor");

exports.AUTOPREFIXER_BROWSERS = [             
    "ie >= 9",
    "ie_mob >= 9",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 6",
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
        vendor: BUILD_BASE_DIR + "/js",
        app: BUILD_BASE_DIR + "/js",
        styles: BUILD_BASE_DIR + "/css",
        fonts: BUILD_BASE_DIR + "/fonts",
        img: BUILD_BASE_DIR + "/img",
        html : BUILD_BASE_DIR + "/",
        templates : {
            dir : BUILD_BASE_DIR + "/js",
            name : "templateCacheHtml.js",
            rootPath : "",
            module: MODULE_NAME
        },
    },
    src: { 
        templates: [ SOURCE_BASE_DIR + '/app/**/*.html' ],
        app: [ SOURCE_BASE_DIR + '/app/**/*.js' ],
        vendor: bowerComponent,
        styles: SOURCE_BASE_DIR + "/assets/sass/*.scss",
        fonts: [SOURCE_BASE_DIR + "/assets/fonts/**/*.*", "./src/assets/lib/bootstrap-sass/assets/fonts/**/*.*"],
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        html : SOURCE_BASE_DIR + "/*.html"
    },
    watch: { 
        templates: SOURCE_BASE_DIR + "/app/**/*.html",
        app: SOURCE_BASE_DIR + "/app/**/*.js",
        styles: SOURCE_BASE_DIR + "/assets/sass/**/*.scss",
        fonts: SOURCE_BASE_DIR + "/assets/fonts/**/*.*",
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        html : SOURCE_BASE_DIR + "/*.html",
        vendor : "./vendor.json",
        reload: BUILD_BASE_DIR + "/**/*.*"
    },
    zip: {
        src: BUILD_BASE_DIR  + "/**/*.*",
        dest: "./"
    },
    clean: {build: BUILD_BASE_DIR,
        zip: "./admin.war",
    },
    server: PROXY_PATHS
};

exports.reportError = function reportError(error, taskName ) {
    var lineNumber = (error.line) ? "LINE " + error.line + " -- " : "";
    var pluginName =  "["+ error.plugin+"]";
    var taskName =  "["+error.taskName+"]";
    
    $.notify({
        title: "Task Failed "+ taskName,
        message: lineNumber + "See console.",
        sound: false
    }).write(error);

    var report = "";
    var chalk = $.util.colors.white.bgRed;

    report += chalk("TASK:") + taskName+"\n";
    report += chalk("Plugin:") + pluginName+"\n";
    report += chalk("ERROR:") + " " + error.message + "\n";
    if (error.line) { report += chalk("LINE:") + " " + error.line + "\n"; }
    if (error.file) { report += chalk("FILE:") + " " + error.file + "\n"; }
 
    console.error(report);
    this.emit("end");
}