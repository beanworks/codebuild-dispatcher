import ConfigParser from "../ConfigParser";
import { Steps } from "../Steps";
import { CodeBuildDefinition } from '../CodeBuildDefinition';

describe("ConfigParser", () => {
  describe('parseYml method', () => {
    it("Should read config", () => {
      ConfigParser.parseYml("src/tests/fixture/steps.yml");
    });
  
    it("Should throw error when file does not exist", () => {
      expect(() => ConfigParser.parseYml("abd")).toThrowErrorMatchingInlineSnapshot(
        `"Cannot open file for test-runs.yml at abd"`
      );
    });
  });

  describe('parseSteps method', () => {
    it('Should return a Steps object', () => {
        const steps = ConfigParser.parseSteps('src/tests/fixture/steps.yml');
        expect(steps).toBeInstanceOf(Steps);
      });
  });

  describe('parseCodeBuildDefinitions method', () => {
    it('Should return an array of CodeBuildDefinition Object', () => {
        const definitions = ConfigParser.parseCodeBuildDefinitions('src/tests/fixture/codebuild-definitions.yml');
        expect(definitions.length).toEqual(5);
      });
  });
});
