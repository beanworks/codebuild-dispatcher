"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
var Step = (function () {
    function Step() {
    }
    Step.fromJson = function (json) {
        var instance = new Step();
        instance.name = json.name;
        instance.path = json.path;
        instance.branch = json.branch;
        instance.message = json.message;
        instance.commands = json.commands;
        instance.branchExclude = json['branch-exclude'];
        instance.codeBuildDefinition = json['codebuild-definition'];
        return instance;
    };
    Step.prototype.getProblems = function () {
        var problems = [];
        if (!this.name) {
            problems.push("name is missing");
        }
        if (!this.path && !this.branch && !this.message && !this.branchExclude) {
            problems.push("At least one of the following needs to be set: path, branch, message, branchExlude");
        }
        if (!this.codeBuildDefinition) {
            problems.push("codebuild-definition has to be set");
        }
        return problems;
    };
    Step.prototype.matchesTo = function (gitInfo) {
        if (this.branchExclude && this.regexMatches(this.branchExclude, gitInfo.branch)) {
            return false;
        }
        var matched = (this.regexMatches(this.path, gitInfo.diff) ||
            this.regexMatches(this.message, gitInfo.message) ||
            this.regexMatches(this.branch, gitInfo.branch));
        this.matched = matched ? '  ✔️  ' : '  ❌ ';
        return matched;
    };
    Step.prototype.regexMatches = function (regexString, comparedTo) {
        if (regexString && comparedTo.match(new RegExp(regexString, 'i'))) {
            return true;
        }
        return false;
    };
    return Step;
}());
exports.Step = Step;
//# sourceMappingURL=Step.js.map