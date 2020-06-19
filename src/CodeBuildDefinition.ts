import {StartBuildInput} from 'aws-sdk/clients/codebuild';

export interface CodeBuildDefinition extends StartBuildInput {
    name: string
}