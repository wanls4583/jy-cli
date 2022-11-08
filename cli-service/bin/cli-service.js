#!/usr/bin/env node

const serve = require('../commands/serve.js');
const build = require('../commands/build.js');
const {
	Command
} = require('commander');
const program = new Command();

program
	.name('jy-cli-service')
	.description('Jy CLI Service')
	.version('0.0.1');

program.command('serve')
	.description('start webpack-dev-serve')
	.action(() => {
		serve();
	});

program.command('build')
	.description('build project')
	.action(() => {
		build();
	});
	
program.parse();