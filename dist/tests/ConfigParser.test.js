"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigParser_1 = __importDefault(require("../ConfigParser"));
var Steps_1 = require("../Steps");
describe("ConfigParser", function () {
    describe('parseYml method', function () {
        it("Should read config", function () {
            ConfigParser_1.default.parseYml("src/tests/fixture/steps.yml");
        });
        it("Should throw error when file does not exist", function () {
            expect(function () { return ConfigParser_1.default.parseYml("abd"); }).toThrowErrorMatchingInlineSnapshot("\"Cannot open file for test-runs.yml at abd\"");
        });
    });
    describe('parseSteps method', function () {
        it('Should return a Steps object', function () {
            var steps = ConfigParser_1.default.parseSteps('src/tests/fixture/steps.yml');
            expect(steps).toBeInstanceOf(Steps_1.Steps);
        });
    });
    describe('parseCodeBuildDefinitions method', function () {
        it('Should return an array of CodeBuildDefinition Object', function () {
            var definitions = ConfigParser_1.default.parseCodeBuildDefinitions('src/tests/fixture/codebuild-definitions.yml');
            expect(definitions.length).toEqual(5);
        });
    });
});
//# sourceMappingURL=ConfigParser.test.js.map