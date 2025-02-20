# GlifRunner #

a simple client that runs given Glifs

## Overview ##

[Glif](https://glif.app/glifs) is a simple visual environment to create (simple) AI agents (called "Glifs") from predefined but configurable building blocks without having to write a single line of code.

Glifs may be run from the Glif web site (or from any other web page that embeds them) or using the [Glif API](https://docs.glif.app/api/getting-started#running-glifs-using-the-simple-api).

The `GlifRunner` implements a simple TypeScript/JavaScript client that simplifies the invocation of such Glifs. In the simplest case, you may run a single Glif and wait for its response just by specifying its id and any required input values (plus ypur personal Glif API token, but that may be configured once and used for any Glif request). Or, you may run several Glifs concurrently, in the background, get informed when they finished or cancel them if you no longer need their output.

> **Important: in order to run Glifs via the API, you will have to [sign up for a Glif account](https://glif.app/signin) and [request your personal API Token](https://glif.app/settings/api-tokens)**

## Installation ##

(t.b.w.)

## Access ##

(t.b.w.)

## Usage within Svelte ###

(t.b.w.)

## API Reference ##

(t.b.w.)

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
