const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "chalk"]
});

exports.AUTOPREFIXER_BROWSERS = [    
    "> 1%",         
    "ie >= 10",
    "ie_mob >= 10",
    "last 2 versions"
];

const MODULE_NAME = "appModule";
const SOURCE_BASE_DIR = "src";
const TARGET_DIR = "build";
const TMP_DIR = ".tmp";
const BUILD_BASE_DIR = TARGET_DIR;
const PROXY_PATHS = [BUILD_BASE_DIR, SOURCE_BASE_DIR];

exports.path = {
    build: { 
        root: BUILD_BASE_DIR,
        vendor: BUILD_BASE_DIR + "/js",
        app: BUILD_BASE_DIR + "/js",
        styles: BUILD_BASE_DIR + "/css",
        fonts: BUILD_BASE_DIR + "/assets/fonts",
        img: BUILD_BASE_DIR + "/assets/img",
        html : BUILD_BASE_DIR + "/",
        templates : {
            dir : BUILD_BASE_DIR + "/js",
            name : "templateCacheHtml.js",
            rootPath : "app",
            module: MODULE_NAME
        },
    },
    src: { 
        root: SOURCE_BASE_DIR,
        templates: [ SOURCE_BASE_DIR + '/app/**/*.html' ],
        app: [ SOURCE_BASE_DIR + '/app/**/!(*.spec|*.mock).js' ],
        vendor: "./vendor1.json",
        styles: SOURCE_BASE_DIR + "/sass/*.scss",
        fonts: [SOURCE_BASE_DIR + "/assets/fonts/**/*.*", "./node_modules/bootstrap-sass/assets/fonts/**/*.*"],
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        html : SOURCE_BASE_DIR + "/*.html"
    },
    tmp:  {
        root: TMP_DIR,
        styles: TMP_DIR + "/serve/app/*.css",
        html : TMP_DIR + "/",
        templates : {
            dir : BUILD_BASE_DIR + "/partials",
            name : "templateCacheHtml.js",
            rootPath : "app",
            module: MODULE_NAME
        }
    },
    watch: { 
        templates: SOURCE_BASE_DIR + "/app/**/*.html",
        app: SOURCE_BASE_DIR + "/app/**/*.js",
        styles: SOURCE_BASE_DIR + "/sass/**/*.scss",
        fonts: SOURCE_BASE_DIR + "/assets/fonts/**/*.*",
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        html : SOURCE_BASE_DIR + "/*.html",
        vendor : "./vendor1.json",
        reload: [ BUILD_BASE_DIR  + "/**/*.*", SOURCE_BASE_DIR  + "/**/*.*"  ]
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



// exports.paths = {
//     index: {
//         src : SOURCE_BASE_DIR + "/index.html",
//         build : BUILD_BASE_DIR + "/",
//         tmp : TMP_DIR + "/"
//     },
//     app: {
//         src: [ SOURCE_BASE_DIR + '/app/**/!(*.spec|*.mock).js' ],
//         build: BUILD_BASE_DIR + "/js",
//         name: "app.js"
//     },
//     vendor: {
//         src: "./vendor1.json",
//         build: BUILD_BASE_DIR + "/js",
//         name: "vendor.js"
//     },
//     styles: {
//         src: SOURCE_BASE_DIR + "/sass/*.scss",
//         build: BUILD_BASE_DIR + "/css",
//         tmp: TMP_DIR + "/serve/app/*.css", 
//         autoprefixer: AUTOPREFIXER_BROWSERS,
//         name: "main.css"
//     },
//     temlates: {
//         src: [ SOURCE_BASE_DIR + '/app/**/*.html' ],
//         build : BUILD_BASE_DIR + "/js",
//         tmp: TMP_DIR + "/partials",
//         name : "templateCacheHtml.js",
//         rootPath : "app",
//         module: MODULE_NAME
//     },
//     fonts: {
//         src: [SOURCE_BASE_DIR + "/assets/fonts/**/*.*", "./node_modules/bootstrap-sass/assets/fonts/**/*.*"],
//         build: BUILD_BASE_DIR + "/assets/fonts"
//     },
//     images: {
//         src: SOURCE_BASE_DIR + "/assets/img/**/*.*",
//         build: BUILD_BASE_DIR + "/assets/img"
//     },
//     watch: { 
//         templates: SOURCE_BASE_DIR + "/app/**/*.html",
//         app: SOURCE_BASE_DIR + "/app/**/*.js",
//         styles: SOURCE_BASE_DIR + "/sass/**/*.scss",
//         fonts: SOURCE_BASE_DIR + "/assets/fonts/**/*.*",
//         img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
//         html : SOURCE_BASE_DIR + "/*.html",
//         vendor : "./vendor1.json",
//     },
//     server:{
//         baseDir: PROXY_PATHS,
//         watch: [ BUILD_BASE_DIR  + "/**/*.*", SOURCE_BASE_DIR  + "/**/*.*"  ]
//     },
//     zip: {
//         src: BUILD_BASE_DIR  + "/**/*.*",
//         build: "./",
//         name: "admin.war"
//     },
//     clean: {
//         build: BUILD_BASE_DIR,
//         zip: "./*.war",
//         tmp: TMP_DIR
//     },
//     root: {
//         src: SOURCE_BASE_DIR,
//         build: BUILD_BASE_DIR,
//         tmp: TMP_DIR
//     }
// }



