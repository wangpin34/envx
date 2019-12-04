# stack-env
[![NPM](https://nodei.co/npm/stack-env.png?stars&downloads)](https://nodei.co/npm/stack-env/)


[![npm package](https://img.shields.io/npm/v/stack-env.svg?style=flat-square)](https://www.npmjs.org/package/stack-env)
[![NPM downloads](http://img.shields.io/npm/dm/stack-env.svg?style=flat-square)](https://npmjs.org/package/stack-env)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/wangpin34/stack-env.svg)](http://isitmaintained.com/project/wangpin34/stack-env "Average time to resolve an issue")

## What problem it tries to resolve
create-react-app provides the basic mechanism to differentiate development and production env,  but it lacks the capability of dividing multiple 'production' env. Let's say there are qa, stg, prod, three stacks,  we are not able to give different env variables per stack like Spring-Profile. Here I want to introduce **stack-env** which means to resolve this pain point.

## Get started
The major concept in stack-env is stack and corresponding env files. e.g., 
stacks: qa, stg, prod,
files: senv.qa, senv.stg, senv.prod

When stack-env runs, it read the stack from process.env to recognize what the exact stack it runs on. And then read the corresponding env file and load it as the env variables. In the end, the desired command runs in an env that all env variables come from the env file.
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
    -k, --key      Stack key
    -v, --verbose  Print full logs
    -V, --version  Output the version number
```

e.g. load env and run command **yarn build**.
```
senv -c 'yarn build'
```
## Alias
What if the injected stack key is not 'stack' but others. stack-env provides a simple configuration section which is located in package.json to give an alias of the key.

```
"senv": {
  "key": "any-key"
}
```

Or through the cmd.
```
stack-env -k 'any-key' -c 'other commands'
```
## LICENSE
MIT
