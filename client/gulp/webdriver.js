"use strict";

module.exports =  (options, $) => {
    return () => {
        return $.protractor[options.webdriver];
    }
}