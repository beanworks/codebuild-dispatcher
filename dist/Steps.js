"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steps = void 0;
var Step_1 = require("./Step");
var Steps = (function () {
    function Steps() {
        this.steps = [];
    }
    Steps.fromJson = function (parsedFromYml) {
        var instance = new Steps();
        for (var _i = 0, parsedFromYml_1 = parsedFromYml; _i < parsedFromYml_1.length; _i++) {
            var json = parsedFromYml_1[_i];
            instance.steps.push(Step_1.Step.fromJson(json));
        }
        return instance;
    };
    Steps.prototype.getProblems = function () {
        var problems = [];
        for (var stepCount in this.steps) {
            var problemsOfAStep = this.steps[stepCount].getProblems();
            if (problemsOfAStep.length !== 0) {
                problems.push("For step number " + stepCount + ", here are the problems: \n\t\t" + problemsOfAStep.join('\n\t\t'));
            }
        }
        return problems;
    };
    Steps.prototype.getMathchedSteps = function (gitInfo) {
        return this.steps.filter(function (s) { return s.matchesTo(gitInfo); });
    };
    Steps.prototype.crossValidateWithDefinitions = function (definitions) {
        var defintionNames = definitions.map(function (d) { return d.name; });
        var problems = [];
        for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
            var step = _a[_i];
            if (defintionNames.includes(step.codeBuildDefinition) === false) {
                problems.push("Cannot locate CodeBuildDefinitions with name " + step.codeBuildDefinition + ".");
            }
        }
        return problems;
    };
    return Steps;
}());
exports.Steps = Steps;
//# sourceMappingURL=Steps.js.map