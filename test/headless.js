global.window = global;
// global.assert = require('chai').assert;
global.assert = require('jest').assert;
require('../src/app');
require('../src/index');
require('./app.spec.js');
