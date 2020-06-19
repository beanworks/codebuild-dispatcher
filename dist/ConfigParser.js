"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCodeBuildDefinitions = exports.parseSteps = exports.parseYml = void 0;
var js_yaml_1 = require("js-yaml");
var Steps_1 = require("./Steps");
var fs = require('fs');
exports.parseYml = function (path) {
    if (fs.existsSync(path) === false) {
        throw new Error('Cannot open file for test-runs.yml at ' + path);
    }
    var doc = js_yaml_1.safeLoad(fs.readFileSync(path, 'utf8'));
    return doc;
};
exports.parseSteps = function (path) {
    if (path === void 0) { path = 'steps.yml'; }
    var json = exports.parseYml(path);
    return Steps_1.Steps.fromJson(json);
};
exports.parseCodeBuildDefinitions = function (path) {
    if (path === void 0) { path = 'codebuild-definitions.yml'; }
    return exports.parseYml(path);
};
exports.default = {
    parseYml: exports.parseYml,
    parseSteps: exports.parseSteps,
    parseCodeBuildDefinitions: exports.parseCodeBuildDefinitions
};
//# sourceMappingURL=ConfigParser.js.map