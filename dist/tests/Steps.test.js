"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigParser_1 = __importDefault(require("../ConfigParser"));
describe("Steps and Step", function () {
    it("Should give correct error messages", function () {
        var steps = ConfigParser_1.default.parseSteps("src/tests/fixture/boched-steps.yml");
        expect(function () { return steps.getProblems(); }).toMatchInlineSnapshot("[Function]");
    });
});
//# sourceMappingURL=Steps.test.js.map