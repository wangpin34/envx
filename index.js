#! /usr/bin/env node
const dotenv = require('dotenv')
const path = require('path')
const args = require('args')
const { exec } = require('child_process')
const pkg = require(path.join(process.cwd(), './package.json'))

const conf = pkg.senv || {}
const stack = conf.stack

function loader(file) {
  const cwd = process.cwd()
  if (file) {
    console.log(`Load env from ${file}`)
    return dotenv.config({ path: path.join(cwd, file) })
  }
  if (process.env[stack]) {
    const target = path.join(cwd, `.senv.${process.env[stack]}`)
    console.log(`Load env from ${target}`)
    return dotenv.config({ path: target })
  }
  console.log(`Load env from ${path.join(cwd, `.senv`)}`)
  return dotenv.config({ path: path.join(cwd, `.senv`) })
}

function cmd(flags) {
  const { cmd, file } = flags
  const result = loader(file)
  if (flags.verbose) {
    console.log(`Loading command: ${cmd}`)
    console.log(`env variables:\n${JSON.stringify(result.parsed, null, 2)}`)
  }
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}

args.option('cmd', 'The command to run')
args.option('file', 'Choose an env file')
args.option('verbose', 'Full logs')

const flags = args.parse(process.argv)
if (flags.cmd) {
  cmd(flags)
}

