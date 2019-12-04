#! /usr/bin/env node
const dotenv = require("dotenv");
const path = require("path");
const args = require("args");
const { exec } = require("child_process");

const cwd = process.cwd();
const pkg = require(path.join(cwd, "./package.json"));

const conf = pkg.senv;

function load(file, inlineKey) {
  if (file) {
    console.log(`Loaded env variables from ${file}`);
    return dotenv.config({ path: path.join(cwd, file) });
  }
  const key = inlineKey || (conf && conf.key) || "stack";
  if (process.env[key]) {
    const target = path.join(cwd, `.senv.${process.env[key]}`);
    console.log(`Loaded env variables from ${target}`);
    return dotenv.config({ path: target });
  }
  console.log(
    `Loaded env variables from ${path.join(
      cwd,
      `.senv`
    )} for default since \'stack\' is not assigned`
  );
  return dotenv.config({ path: path.join(cwd, `.senv`) });
}

function cmd(flags) {
  const { cmd, file } = flags;
  const result = load(file, flags.key);
  if (flags.verbose) {
    console.log(`Loading command: ${cmd}`);
    console.log(`env variables:\n${JSON.stringify(result.parsed, null, 2)}`);
  }
  const child = exec(
    cmd,
    { windowsHide: true, maxBuffer: 1024 * 1024 },
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  );

  child.stdout.on("data", function(data) {
    console.info(data);
  });

  child.stderr.on("data", function(data) {
    console.error(data);
  });

  child.on("close", function(code) {
    console.log(`child process close all stdio with code ${code}`);
  });

  child.on("exit", function(code) {
    console.log(`child process exited with code ${code}`);
  });

  process.on("exit", function(code) {
    console.log(`stack-env exited with code ${code}`);
    child.kill();
  });
}

args.option("cmd", "The command to run");
args.option("file", "Choose an env file");
args.option(["v", "verbose"], "Print full logs");
args.option(["k", "key"], "Stack key");

const flags = args.parse(process.argv);
if (flags.cmd) {
  cmd(flags);
}
