/* global module */
'use strict';

function Transformer (config) {
    /* a transformer should always have an execute function */
    this.execute = config.execute || function(done) {
        // the mock transformer will pr default return the contents
        // of its data object
        done(undefined, this.data);
    };

    /* the following keys are optional */
    this.initialize = config.initialize;

    this.preprocessors = config.preprocessors;
    this.postprocessors = config.postprocessors;

    this.helpers = config.helpers;

    /* the following keys are mandatory, but it is okay if they are empty */
    this.queries = config.queries || {};
    this.outputs = config.outputs || [];
}

module.exports = function (config) {
    return new Transformer(config || {});
};
