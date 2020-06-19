import { GitInfo } from "./Git";

export interface RawStepJson {
    commands?: string[]
    [key: string]: any
}

export class Step {
    public name: string;
    public path: string | undefined;
    public branch: string | undefined;
    public message: string | undefined;
    public branchExclude: string | undefined;
    public codeBuildDefinition: string;
    public commands: string[];
    public matched: string; // used for displaying in table ( emoji )

    public static fromJson(json: RawStepJson) {
        const instance = new Step();
        instance.name = json.name;
        instance.path = json.path;
        instance.branch = json.branch;
        instance.message = json.message;
        instance.commands = json.commands;
        instance.branchExclude = json['branch-exclude'];
        instance.codeBuildDefinition = json['codebuild-definition'];

        return instance;
    }

    public getProblems() : string[] {
        const problems = [];
        
        if (!this.name) {
            problems.push("name is missing");
        }

        if (!this.path && !this.branch && !this.message && !this.branchExclude) {
            problems.push("At least one of the following needs to be set: path, branch, message, branchExlude");
        }

        if(!this.codeBuildDefinition) {
            problems.push("codebuild-definition has to be set");
        }

        return problems;
    }

    public matchesTo(gitInfo : GitInfo) : boolean {

        if (this.branchExclude && this.regexMatches(this.branchExclude, gitInfo.branch)) {
            return false;
        }

        const matched =  (this.regexMatches(this.path, gitInfo.diff) ||
            this.regexMatches(this.message, gitInfo.message) ||
            this.regexMatches(this.branch, gitInfo.branch));

        this.matched = matched ? '  ✔️  ' : '  ❌ ';
        return matched;

    }

    private regexMatches(regexString: string, comparedTo: string) {
        if (regexString && comparedTo.match(new RegExp(regexString, 'i'))) {
            return true;
        }

        return false;
    }
}