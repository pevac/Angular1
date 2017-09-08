const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "chalk"]
});

let util = {}

util.reportError = function(error, taskName)  {
    var lineNumber = error.line || error.lineNumber || null;
    var file = error.file || error.fileName || null;
    
    var lineError = (lineNumber) ? "LINE " + lineNumber + " -- " : "";
    var task = (taskName) ? "["+taskName+"]" : "["+ error.plugin+"]";
    
    $.notify({
        title: "Task Failed "+ task,
        message: lineError + "See console.",
        sound: false
    }).write(error);

    var report = "";
    var chalk = $.chalk.white.bgRed;

    if (taskName) {report += chalk("TASK:") + taskName+"\n";}
    report += chalk("Plugin:") + error.plugin+"\n";
    report += chalk("ERROR:") + " " + error.message + "\n";
    if (lineNumber) { report += chalk("LINE:") + " " + lineNumber + "\n"; }
    if (file) { report += chalk("FILE:") + " " + file+ "\n"; }
 
    console.error(report);
    
    this.emit("end");
}

module.exports = util;