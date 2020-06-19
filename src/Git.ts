const { execSync } = require("child_process");

export interface GitInfo {
    diff: string,
    branch: string,
    message: string,
    commitHash: string,
}

export const getGitInfo = (dir: string = './') : GitInfo => {
    if (isGit(dir) === false) {
        throw new Error(`dir ${dir} is not a valid git repo`);
    }

    return {
        branch: getBranch(dir),
        diff: getDiff(dir),
        message: getMessage(dir),
        commitHash: getCommitHash(dir),
    };
}

export const getDiff = (dir: string = './') : string => {
    const resp = execSync(`git diff --name-only HEAD HEAD~1`, {
        cwd: dir,
        encoding: 'UTF8',
    });

    return resp;
}

export const getBranch = (dir: string = './') : string => {
    const resp: string = execSync('git branch', {
        cwd: dir,
        encoding: 'UTF8'
    });

    const line = resp.split('\n').filter(l => l.includes('*'))[0];
    return line.split(' ')[1];
}

export const getMessage = (dir: string = './') : string => {
    const resp: string = execSync('git log -1', {
        cwd: dir,
        encoding: 'UTF8'
    });

    return resp;
}

export const getCommitHash = (dir: string = './') : string => {
    const resp: string = execSync('git rev-parse HEAD', {
        cwd: dir,
        encoding: 'UTF8'
    });

    return resp.replace("\n", '');
}



export const isGit = (dir: string = './') : boolean => {
    const resp: string = execSync('ls -al', {
        cwd: dir,
        encoding: 'UTF8'
    });

    return resp.includes('.git');
}

export default {
    isGit,
    getDiff,
    getBranch,
    getMessage,
    getGitInfo,
    getCommitHash,
}