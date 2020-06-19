import { Step, RawStepJson } from "./Step";
import { GitInfo } from "./Git";
import { CodeBuildDefinition } from "./CodeBuildDefinition";

export class Steps {
    public steps : Step[] = [];

    public static fromJson(parsedFromYml: RawStepJson[]) {
        const instance = new Steps();

        for (const json of parsedFromYml) {
            instance.steps.push(Step.fromJson(json));
        }

        return instance;
    }

    public getProblems() {
        const problems = [];

        for (const stepCount in this.steps) {
            const problemsOfAStep = this.steps[stepCount].getProblems();
            if (problemsOfAStep.length !== 0) {
                problems.push(`For step number ${stepCount}, here are the problems: \n\t\t` + problemsOfAStep.join('\n\t\t'));
            }
        }

        return problems;
    }

    public getMathchedSteps(gitInfo : GitInfo) {
        return this.steps.filter(s => s.matchesTo(gitInfo));
    }

    public crossValidateWithDefinitions(definitions : CodeBuildDefinition[]) {
        const defintionNames = definitions.map(d => d.name);
        const problems = [];
        for (const step of this.steps) {
            if (defintionNames.includes(step.codeBuildDefinition) === false) {
                problems.push(`Cannot locate CodeBuildDefinitions with name ${step.codeBuildDefinition}.`);
            }
        }

        return problems;
    }
}