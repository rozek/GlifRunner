# GlifRunner #

a simple client that runs given Glifs

## Overview ##

[Glif](https://glif.app/glifs) is a simple visual environment to create (simple) AI agents (called "Glifs") from predefined but configurable building blocks without having to write a single line of code.

Glifs may be run from the Glif web site (or from any other web page that embeds them) or using the [Glif API](https://docs.glif.app/api/getting-started#running-glifs-using-the-simple-api).

The `GlifRunner` implements a simple TypeScript/JavaScript client that facilitates the invocation of such Glifs. In the simplest case, you may run a single Glif and wait for its response just by specifying its id and any required input values (plus ypur personal Glif API token, but that may be configured once and used for any Glif request). Or, you may run several Glifs concurrently, in the background, get informed when they finished or cancel them if you no longer need their output.

> **Important: in order to run Glifs via their API, you will have to [sign up for a Glif account](https://glif.app/signin) and [request your personal API Token](https://glif.app/settings/api-tokens)**

> **Warning**: logging the GlifRunner or its instances in the browser console may reveal the configured API Token!

## Installation ##

The `GlifRunner` may be used as an ECMAScript module (ESM), a CommonJS or AMD module or from a global variable.

You may either install the package into your build environment using [NPM](https://docs.npmjs.com/) with the command

```
npm install GlifRunner
```

or load the plain script file directly

```html
<script src="https://rozek.github.io/GlifRunner/dist/GlifRunner.esm.js"></script>
```

## Access ##

How to access the package depends on the type of module you prefer

* ESM (or Svelte): `import { GlifRunner } from 'GlifRunner'`
* CommonJS: `const GlifRunner = require('GlifRunner')`
* AMD: `require(['GlifRunner'], (GlifRunner) => {...})`

Alternatively, you may access the global variable `GlifRunner` directly.

## Usage within Svelte ###

For Svelte, it is recommended to import the package in a module context. From then on, its exports may be used as usual:

```html
<script context="module">
  import { GlifRunner } from 'GlifRunner'
</script>

<script>
  GlifRunner.APIToken = '...'
	;(async () => {
		console.log(await GlifRunner.run('cm7c4nbnm000fj9tzb9t3pcgw')) // that's my "Hello, World!" Glif
	})()
</script>
```

You may experiment with that code [in the Svelte REPL](https://svelte.dev/playground/ae2740d646bb46cc9c95f0fe38a1b25b?version=5.20.2)

## Examples ##

Here are some typical examples.

### Static Usage ###

Using static methods avoids having to instantiate a GlifRunner and may be the simplest way to invoke Glifs

```javascript
  GlifRunner.APIToken = '...' // enter your Glif API token here
  console.log(await GlifRunner.run('cm7c4nbnm000fj9tzb9t3pcgw')) // that's my "Hello, World!" Glif
```

### Instance Usage ###

If you want to be able to cancel a Glif request (note: the Glif itself continues to run and consume your credits, but it won't respond any longer), you will have to create a GlifRunner instance and use that to invoke your Glif:

```javascript
  GlifRunner.APIToken = '...' // enter your Glif API token here
  const Runner = new GlifRunner()
  const Result = await Runner.run('cm7cslpjn000dynhku4x8kw01') // "Hello, Image!" delivering an image
  console.log('Result',Result)
```

In most cases, you will use a single API token for all your Glif invocations (and then it's fine to configure that token statically), but if you still want to use individual tokens for specific Glifs, you may specify different API tokens per GlifRunner instance:

```javascript
  const Runner = new GlifRunner('...') // enter your Glif API token here
  const Result = await Runner.run('cm7csu1ol000212y6m6f811wp') // "Hello, Audio!" delivering an audio file
  console.log('Result',Result)
```

And here is how you would cancel a running request

```javascript
  GlifRunner.APIToken = '...' // enter your Glif API token here
  const Runner = new GlifRunner()
  const Result = Runner.run('cm7cslpjn000dynhku4x8kw01') // "Result" will now be a Promise
  Runner.abort()
```

If you run several requests concurrently, you may want to be informed when they finish or fail:

```javascript
  GlifRunner.APIToken = '...' // enter your Glif API token here
  const Runner = new GlifRunner()
  Runner.run('cm7cslpjn000dynhku4x8kw01',[],(Outcome,Runner) => {
    console.log(Outcome instanceof Error ? 'run failed with' : 'run returned', Outcome)
    console.log('the runner managing this request was',Runner)
  })
```

## API Reference ##

### GlifRunner Class ###

* `constructor (APIToken?:string)`<br>initializes a new instance of `GlifRunner`, optionally accepting an API token for authentication with the Glif API.
* `get isRunning ():boolean`<br>returns a boolean indicating whether a Glif is currently running.
* `abort ():void`<br>stops the currently running Glif, if any.
* `get Response ():object | undefined`<br>returns the response from the last executed Glif, or `undefined` if no Glif has been run.
* `run (GlifId:string, InputValues?:GlifInputs, Callback?:Function):Promise<object>`<br>executes a Glif identified by `GlifId` with optional input values and a callback function. Returns a promise that resolves to the response object.

### Static Methods ###

* `static get APIToken ():string | undefined`<br>returns the global API token used for Glif API authentication.
* `static set APIToken (APIToken:string | undefined)`<br>sets the global API token for Glif API authentication.
* `static run (GlifId:string, InputValues:GlifInputs, Callback?:Function):Promise<object>`<br>provides a convenience method to run a Glif without needing to instantiate a `GlifRunner`. Returns a promise that resolves to the response object.

### Type Reference ###

* `GlifInputs`<br>represents the input values for a Glif, which can be either an array of strings or an object with string key-value pairs.

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/GlifRunner/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
