"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGit = exports.getCommitHash = exports.getMessage = exports.getBranch = exports.getDiff = exports.getGitInfo = void 0;
var execSync = require("child_process").execSync;
exports.getGitInfo = function (dir) {
    if (dir === void 0) { dir = './'; }
    if (exports.isGit(dir) === false) {
        throw new Error("dir " + dir + " is not a valid git repo");
    }
    return {
        branch: exports.getBranch(dir),
        diff: exports.getDiff(dir),
        message: exports.getMessage(dir),
        commitHash: exports.getCommitHash(dir),
    };
};
exports.getDiff = function (dir) {
    if (dir === void 0) { dir = './'; }
    var resp = execSync("git diff --name-only HEAD HEAD~1", {
        cwd: dir,
        encoding: 'UTF8',
    });
    return resp;
};
exports.getBranch = function (dir) {
    if (dir === void 0) { dir = './'; }
    var resp = execSync('git branch', {
        cwd: dir,
        encoding: 'UTF8'
    });
    var line = resp.split('\n').filter(function (l) { return l.includes('*'); })[0];
    return line.split(' ')[1];
};
exports.getMessage = function (dir) {
    if (dir === void 0) { dir = './'; }
    var resp = execSync('git log -1', {
        cwd: dir,
        encoding: 'UTF8'
    });
    return resp;
};
exports.getCommitHash = function (dir) {
    if (dir === void 0) { dir = './'; }
    var resp = execSync('git rev-parse HEAD', {
        cwd: dir,
        encoding: 'UTF8'
    });
    return resp.replace("\n", '');
};
exports.isGit = function (dir) {
    if (dir === void 0) { dir = './'; }
    var resp = execSync('ls -al', {
        cwd: dir,
        encoding: 'UTF8'
    });
    return resp.includes('.git');
};
exports.default = {
    isGit: exports.isGit,
    getDiff: exports.getDiff,
    getBranch: exports.getBranch,
    getMessage: exports.getMessage,
    getGitInfo: exports.getGitInfo,
    getCommitHash: exports.getCommitHash,
};
//# sourceMappingURL=Git.js.map