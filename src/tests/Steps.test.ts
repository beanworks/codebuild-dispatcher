import ConfigParser from "../ConfigParser";

describe("Steps and Step", () => {
  it("Should give correct error messages", () => {
    const steps = ConfigParser.parseSteps("src/tests/fixture/boched-steps.yml");
    expect(() => steps.getProblems()).toMatchInlineSnapshot(`[Function]`);
  });
});
