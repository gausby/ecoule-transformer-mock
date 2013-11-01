/*jslint maxlen:140*/
/* global require process */
'use strict';

var buster = require('buster'),
    transformer = require('../lib/ecoule-transformer-mock'),

    assert = buster.referee.assert,
    refute = buster.referee.refute
;

buster.testCase('Basic écoule transformer support', {
    // initialize function
    'should not have an initializer function per default': function () {
        refute.defined(transformer({}).initialize);
    },

    'should be able to set an initializer function': function () {
        var mock = function (done) { done(); };
        assert.same(transformer({ initialize: mock }).initialize, mock);
    },

    // execute function
    'should have an execute function per default': function () {
        assert.defined(transformer({}).execute);
    },

    'should be able to set an custom execute function': function () {
        var mock = function (done) { done(undefined, {}); };
        assert.same(transformer({ execute: mock }).execute, mock);
    },

    'should perform a callback when the default execute function is run': function () {
        var foo = transformer();
        foo.execute(function (err, output) {
            refute.defined(err);
            refute.defined(output);
        });
    },

    'should return the contens of this.data when the default execute function is run': function () {
        var obj = {foo: 'bar'};
        var foo = transformer();
        foo.data = obj;
        foo.execute(function (err, output) {
            assert.same(output, obj);
        });
    },

    // queries
    'should have an empty object set as queries by default': function () {
        assert.isObject(transformer().queries);
    },

    'should be able to set queries': function () {
        var mock = { foo: { bar: {equals: 'baz'}}};
        assert.same(transformer({queries: mock}).queries, mock);
    },

    // outputs
    'should have an empty array assigned as default outputs': function () {
        assert.isArray(transformer().outputs);
    },

    'should be able to set outputs': function () {
        var mock = [function () {}];
        assert.same(transformer({outputs: mock}).outputs, mock);
    },

    // pre processors
    'should not have a list of preprocessors per default': function () {
        refute.defined(transformer().preprocessors);
    },

    'should be able to set a list of preprocessors': function () {
        var mock = [function() {}, function() {}, function() {}];
        assert.same(transformer({preprocessors: mock}).preprocessors, mock);
    },

    // post processors
    'should not have a list of postprocessors per default': function () {
        refute.defined(transformer().postprocessors);
    },

    'should be able to set a list of postprocessors': function () {
        var mock = [function() {}, function() {}, function() {}];
        assert.same(transformer({postprocessors: mock}).postprocessors, mock);
    },

    // helpers
    'should not have a helper object assigned by default': function () {
        refute.defined(transformer().helpers);
    },

    'should be able to set a helper object': function () {
        var mock = { 'foo': 'bar' };
        assert.same(transformer({ helpers: mock }).helpers, mock);
    }
});