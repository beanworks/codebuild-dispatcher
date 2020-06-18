import Git from "Git";
const { execSync } = require("child_process");

describe("Git", () => {
  describe("diff", () => {
    it("Should return correct diff when giving correct path", () => {
      const diff = Git.diff("src/tests/fixture/AAndBNotC");
      console.log(diff);
      expect(diff).toMatchInlineSnapshot(`
        "A/Entity/Mouse.txt
        A/Services/MouseManager.txt
        B/B52.txt
        "
      `);
    });
  })
});
