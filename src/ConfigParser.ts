import {safeLoad} from 'js-yaml';
import { Steps } from './Steps';
import { CodeBuildDefinition } from './CodeBuildDefinition';
const fs = require('fs');

export const parseYml = (path: string) => {
    if (fs.existsSync(path) === false) {
        throw new Error('Cannot open file for test-runs.yml at ' + path);
    }

    const doc = safeLoad(fs.readFileSync(path, 'utf8'));

    return doc;
}

export const parseSteps = (path: string = 'steps.yml') : Steps => {
    const json = parseYml(path);
    return Steps.fromJson(json);
}

export const parseCodeBuildDefinitions = (path: string = 'codebuild-definitions.yml') : CodeBuildDefinition[] => {
    return parseYml(path);
}



export default {
    parseYml,
    parseSteps,
    parseCodeBuildDefinitions
}