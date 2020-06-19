import { Step } from "./Step";
import { CodeBuildDefinition } from "./CodeBuildDefinition";
import * as AWS from 'aws-sdk';
import { GitInfo } from "./Git";
import chalk = require('chalk');

export class Runner {

    private steps: Step[];
    private definitions: Map<string, CodeBuildDefinition>;
    private gitInfo: GitInfo;
    private codeBuild: AWS.CodeBuild;
    private promises : Promise<any>[] = [];

    constructor(steps: Step[], definitions: CodeBuildDefinition[], gitInfo: GitInfo) {
        this.steps = steps;
        this.codeBuild = new AWS.CodeBuild();
        this.gitInfo = gitInfo;
        this.definitions = definitions.reduce((pv, cv) => {
            pv.set(cv.name, cv);
            return pv;
        }, new Map())
    }

    public async run(dryRun: boolean) {
        console.log('dryRun :>> ', dryRun);
        try {
            for (const step of this.steps) {
                const definition = this.definitions.get(step.codeBuildDefinition); // todos
                definition.sourceVersion = this.gitInfo.commitHash;
                delete definition['name'];

                if (step.commands) {
                    definition.environmentVariablesOverride = [
                        {
                            name: 'CI_COMMANDS',
                            value: step.commands.join('\n'),
                            type: 'PLAINTEXT'
                        }
                    ]
                }

                if (dryRun) {
                    continue;
                }
                console.log(chalk.grey('Triggering AWS Codebuild with the following parameters'), chalk.grey(JSON.stringify(definition, null, '\t')));
                const promise = this.codeBuild.startBuild(definition).promise();
                this.promises.push(promise);
            }

            if (!dryRun && this.promises.length > 0) {
                await Promise.all(this.promises);
            }
        } catch (e) {
            console.error(e.message);
            throw e;
        }
        
    }
}