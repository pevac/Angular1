"use strict";

module.exports =  (options, $) => {
    return (done) => {
        return $.del(options.clean);
    }
}