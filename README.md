# stack-env
[![NPM](https://nodei.co/npm/stack-env.png?stars&downloads)](https://nodei.co/npm/stack-env/)


[![npm package](https://img.shields.io/npm/v/stack-env.svg?style=flat-square)](https://www.npmjs.org/package/stack-env)
[![NPM downloads](http://img.shields.io/npm/dm/stack-env.svg?style=flat-square)](https://npmjs.org/package/stack-env)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/wangpin34/stack-env.svg)](http://isitmaintained.com/project/wangpin34/stack-env "Average time to resolve an issue")

## What problem does it resolve?
### The background
Recently I'm working on a react application which is bootstrapped by create-react-app(CRA). There are mutiple online environment(e.g. dev,qa,stg, and prod) so that I have to configure mutiple sets of enviroment variables to the app. Unfortunately, CRA only provides two kind of env conf for local development and online. So I comes to the idea to develop a tool for this requirement.

### My idea
A cli tool which can read the environment **stack**(value is the name of online env) and load the conrespondding env file. e.g. stack=dev, then it loads variables from file **.senv.dev**. 
## Usage
```
  Usage: senv [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -c, --cmd      The command to run
    -f, --file     Choose an env file
    -h, --help     Output usage information
    -v, --verbose  Print full logs
    -V, --version  Output the version number
```

e.g. load env and run command **yarn build**.
```
senv -c 'yarn build'
```

## LICENSE
MIT
