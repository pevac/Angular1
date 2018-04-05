"use strict";

module.exports =  (options, $) => {
    return   (done) => {
        return $.cache.clearAll(done);
    }
}