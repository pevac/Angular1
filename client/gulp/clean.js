"use strict";

module.exports =  (options, $) => {
    return (done) => {
        return require("del")(options.clean, done);
    }
}