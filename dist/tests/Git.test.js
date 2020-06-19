"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Git_1 = __importDefault(require("../Git"));
var execSync = require("child_process").execSync;
describe("Git", function () {
    describe("diff", function () {
        it("should return correct diff when giving correct path", function () {
            var diff = Git_1.default.getDiff("src/tests/fixture/AAndBNotC");
            expect(diff).toMatchInlineSnapshot("\n        \"A/Entity/Mouse.txt\n        A/Services/MouseManager.txt\n        B/B52.txt\n        \"\n      ");
        });
    });
    describe("branch", function () {
        it("should return the current branch", function () {
            var branch = Git_1.default.getBranch("src/tests/fixture/AAndBNotC");
            expect(branch).toMatchInlineSnapshot("\"master\"");
        });
    });
    describe("isGit", function () {
        it("should return true if the dir is git", function () {
            var isGit = Git_1.default.isGit("src/tests/fixture/AAndBNotC");
            expect(isGit).toEqual(true);
        });
        it("should return false if the dir is git", function () {
            var isGit = Git_1.default.isGit("src/tests/fixture");
            expect(isGit).toEqual(false);
        });
    });
    describe("getGitInfo", function () {
        it("Should return valid GitInfo Object", function () {
            var gitInfo = Git_1.default.getGitInfo("src/tests/fixture/AAndBNotC");
            expect(gitInfo).toMatchInlineSnapshot("\n        Object {\n          \"branch\": \"master\",\n          \"commitHash\": \"a421e32e8e57109f74b3aa8eee0e612dfc0c4668\",\n          \"diff\": \"A/Entity/Mouse.txt\n        A/Services/MouseManager.txt\n        B/B52.txt\n        \",\n          \"message\": \"commit a421e32e8e57109f74b3aa8eee0e612dfc0c4668\n        Author: Tom Lei <tom@beanworks.com>\n        Date:   Thu Jun 18 04:55:57 2020 +0000\n\n            A And B Not C\n        \",\n        }\n      ");
        });
    });
});
//# sourceMappingURL=Git.test.js.map