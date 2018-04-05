"use strict";

module.exports =  (options, $) => {
    return () => {
        return $.del(options.clean);
    }
}