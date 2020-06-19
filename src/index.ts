#!/usr/bin/env node

import ConfigParser from "./ConfigParser";
import Git from "./Git";
import { Runner } from "./Runner";
const chalk = require('chalk');

const { program } = require('commander');

console.log(`
 __         __
/  \\.-"""-./  \\
\\    -   -    /
 |   o   o   |
 \\  .-'''-.  /
  '-\\__Y__/-'
     '---'
`);

program.option('-s, --steps <steps>', 'location of steps.yml');
program.option('-d, --defintions <defintions>', 'location of codebuild-defintions.yml');
program.option('-dry, --dryrun', '');

program.parse(process.argv);

program.steps = program.steps || 'steps.yml';
program.definitions = program.definitions || 'codebuild-definitions.yml';

console.info('Loading steps from ' + program.steps);
console.info('Loading locations from ' + program.definitions);

const steps = ConfigParser.parseSteps(program.steps);
const definitions = ConfigParser.parseCodeBuildDefinitions(program.definitions);
const gitInfo = Git.getGitInfo();

console.log('gitInfo :>> ', gitInfo);


const problemsWithSteps = steps.getProblems();
const problemsBetweenStepsAdDefinitios = steps.crossValidateWithDefinitions(definitions);

if (problemsWithSteps.length > 0 || problemsBetweenStepsAdDefinitios.length > 0) {
    console.error(chalk.red(`\n\n Error found: \n`));
    console.error(chalk.red(`${problemsWithSteps.join('\n')}`));
    console.error(chalk.red(problemsBetweenStepsAdDefinitios.join('\n')));
    process.exit(1);
}
// TODO: Check if Definitions is valid by using the actual AWS SDK
const stepsToRun = steps.getMathchedSteps(gitInfo);
console.log(chalk.green(`\n\n Here are the steps: \n`));
console.table(steps.steps.sort((a,b) => {
    if (a.matched === b.matched) {
        return a.name.length > b.name.length ? 1 : -1;
    }
    return a.matched > b.matched ? 1 : -1;
}));

const runner = new Runner(stepsToRun, definitions, gitInfo);
runner.run(program.dryrun);


// steps.validate();





