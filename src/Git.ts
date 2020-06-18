const path = require('path');
const { execSync } = require("child_process");

export const diff = (dir: string) => {
    const resp = execSync(`git diff --name-only HEAD HEAD~1`, {
        cwd: dir,
        encoding: 'UTF8'
    });
    return resp;
}

export default {
    diff
}