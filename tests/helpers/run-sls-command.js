const { promisify } = require("util");
const { exec } = require("child_process");
const npmInstall = require("./npm-install");

const execPromise = promisify(exec);
const TIMEOUT = 30000;
const INVOKE_CMD = "invoke local -f hello --data {}";

async function runSlsCommand(cwd, cmd = INVOKE_CMD, includeStderr = true) {
  await npmInstall(cwd);

  try {
    const { stdout, stderr } = await execPromise(`serverless ${cmd}`, {
      cwd,
      timeout: TIMEOUT,
    });
    return includeStderr
      ? stdout.toString("utf8") + stderr.toString("utf8")
      : stdout.toString("utf8");
  } catch (error) {
    // Ensure to capture and throw error with stdout and stderr
    const stdout = error.stdout ? error.stdout.toString("utf8") : "";
    const stderr = error.stderr ? error.stderr.toString("utf8") : "";
    throw { stdout, stderr };
  }
}

module.exports = runSlsCommand;
