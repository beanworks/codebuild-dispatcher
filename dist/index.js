#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigParser_1 = __importDefault(require("./ConfigParser"));
var Git_1 = __importDefault(require("./Git"));
var Runner_1 = require("./Runner");
var chalk = require('chalk');
var program = require('commander').program;
console.log("\n __         __\n/  \\.-\"\"\"-./  \\\n\\    -   -    /\n |   o   o   |\n \\  .-'''-.  /\n  '-\\__Y__/-'\n     '---'\n");
program.option('-s, --steps <steps>', 'location of steps.yml');
program.option('-d, --defintions <defintions>', 'location of codebuild-defintions.yml');
program.option('-dry, --dryrun', '');
program.parse(process.argv);
program.steps = program.steps || 'steps.yml';
program.definitions = program.definitions || 'codebuild-definitions.yml';
console.info('Loading steps from ' + program.steps);
console.info('Loading locations from ' + program.definitions);
var steps = ConfigParser_1.default.parseSteps(program.steps);
var definitions = ConfigParser_1.default.parseCodeBuildDefinitions(program.definitions);
var gitInfo = Git_1.default.getGitInfo();
console.log('gitInfo :>> ', gitInfo);
var problemsWithSteps = steps.getProblems();
var problemsBetweenStepsAdDefinitios = steps.crossValidateWithDefinitions(definitions);
if (problemsWithSteps.length > 0 || problemsBetweenStepsAdDefinitios.length > 0) {
    console.error(chalk.red("\n\n Error found: \n"));
    console.error(chalk.red("" + problemsWithSteps.join('\n')));
    console.error(chalk.red(problemsBetweenStepsAdDefinitios.join('\n')));
    process.exit(1);
}
var stepsToRun = steps.getMathchedSteps(gitInfo);
console.log(chalk.green("\n\n Here are the steps: \n"));
console.table(steps.steps.sort(function (a, b) {
    if (a.matched === b.matched) {
        return a.name.length > b.name.length ? 1 : -1;
    }
    return a.matched > b.matched ? 1 : -1;
}));
var runner = new Runner_1.Runner(stepsToRun, definitions, gitInfo);
runner.run(program.dryrun);
//# sourceMappingURL=index.js.map