import { GitInfo } from "../Git";
import { Step } from "../Step";

describe('Step object', () => {
    describe('matchesTo method', () => {
        var gitInfo : GitInfo;
        var step : Step;
        beforeAll(() => {
            gitInfo = {
                branch: 'master',
                diff: `api/Entity/Model1
                api/Service/NetworkService
                ui/View/View1
                test.yml`,
                message: `[tag1] BEAN-1001 some commit message`,
                commitHash: 'ABC'
            };
        })

        beforeEach(() => {
            step = Step.fromJson({});
        });
        describe('Path only matching', () => {
            it('Should return true when path matches', () => {
                step.path = 'api/Service';
                expect(step.matchesTo(gitInfo)).toEqual(true);
            });
            it('Should return false when path does not match', () => {
                step.path = 'api/Controller';
                expect(step.matchesTo(gitInfo)).toEqual(false);
            });
        });

        describe('Branch only matching', () => {
            it('should return true when branch regex matches', () => {
                step.branch = 'master|beta';
                expect(step.matchesTo(gitInfo)).toEqual(true);
            });
            it('should return true when branch regex does not match', () => {
                step.branch = 'stable|beta';
                expect(step.matchesTo(gitInfo)).toEqual(false);
            });
        });

        describe('Message only matching', () => {
            it('should return true when message regex matches', () => {
                step.message = '\\[tag1\\]';
                expect(step.matchesTo(gitInfo)).toEqual(true);
            });
            it('should return true when message regex does not match', () => {
                step.message = '\\[tag22\\]';
                expect(step.matchesTo(gitInfo)).toEqual(false);
            });
        });

        describe('Branch Exclusion only matching', () => {
            it('should fall back to others when the specified regex does not match', () => {
                step.branchExclude = 'beta|stable';
                step.message = 'tag';
                expect(step.matchesTo(gitInfo)).toEqual(true);
            });
            it('should return false when the specified regex does match', () => {
                step.branchExclude = 'master|stable';
                expect(step.matchesTo(gitInfo)).toEqual(false);
            });
        });

        describe('Branch Exclusion with something else', () => {
            it('should return true if message message matches and branch is not in exclusion list', () => {
                step.message = 'tag';
                step.branchExclude = 'beta|stable';
                expect(step.matchesTo(gitInfo)).toEqual(true);
            });
            it('should return false when message matches and branch is in exclusion list', () => {
                step.message = 'tag';
                step.branchExclude = 'master|stable';
                expect(step.matchesTo(gitInfo)).toEqual(false);
            });
        });

        describe('Branch and Branch Exclusion are both set', () => {
            it('should be an AND relationship', async () => {
                step.branch = 'master';
                step.branchExclude = 'beta|stable';
                expect(step.matchesTo(gitInfo)).toEqual(true);

                step.branch = 'ABC';
                expect(step.matchesTo(gitInfo)).toEqual(false);
            });
        });


    });
});