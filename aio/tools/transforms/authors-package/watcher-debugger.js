/* eslint no-console: "off" */
const watchr = require('watchr');
const {relative} = require('canonical-path');
const {generateDocs} = require('./index.js');
const { PROJECT_ROOT, CONTENTS_PATH, API_SOURCE_PATH } = require('../config');

let p = Promise.resolve();

const {Dgeni} = require('dgeni');
const dgeni = new Dgeni([require('../angular.io-package')]);

// Turn off all the potential failures for this doc-gen one-off run.
// This enables authors to run `docs-watch` while the docs are still in an unstable state.
const injector = dgeni.configureInjector();
injector.get('linkInlineTagDef').failOnBadLink = false;
injector.get('checkAnchorLinksProcessor').$enabled = false;
injector.get('renderExamples').ignoreBrokenExamples = true;

p = dgeni.generate();
