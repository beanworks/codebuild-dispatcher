import Git from "../Git";
const { execSync } = require("child_process");

describe("Git", () => {
  describe("diff", () => {
    it("should return correct diff when giving correct path", () => {
      const diff = Git.getDiff("src/tests/fixture/AAndBNotC");
      expect(diff).toMatchInlineSnapshot(`
        "A/Entity/Mouse.txt
        A/Services/MouseManager.txt
        B/B52.txt
        "
      `);
    });
  });

  describe("branch", () => {
    it("should return the current branch", () => {
      const branch = Git.getBranch("src/tests/fixture/AAndBNotC");
      expect(branch).toMatchInlineSnapshot(`"master"`);
    });
  });

  describe("isGit", () => {
    it("should return true if the dir is git", () => {
      const isGit = Git.isGit("src/tests/fixture/AAndBNotC");
      expect(isGit).toEqual(true);
    });

    it("should return false if the dir is git", () => {
      const isGit = Git.isGit("src/tests/fixture");
      expect(isGit).toEqual(false);
    });
  });

  describe("getGitInfo", () => {
    it("Should return valid GitInfo Object", () => {
      const gitInfo = Git.getGitInfo("src/tests/fixture/AAndBNotC");
      expect(gitInfo).toMatchInlineSnapshot(`
        Object {
          "branch": "master",
          "commitHash": "a421e32e8e57109f74b3aa8eee0e612dfc0c4668",
          "diff": "A/Entity/Mouse.txt
        A/Services/MouseManager.txt
        B/B52.txt
        ",
          "message": "commit a421e32e8e57109f74b3aa8eee0e612dfc0c4668
        Author: Tom Lei <tom@beanworks.com>
        Date:   Thu Jun 18 04:55:57 2020 +0000

            A And B Not C
        ",
        }
      `);
    });
  });
});
