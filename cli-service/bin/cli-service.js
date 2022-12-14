#!/usr/bin/env node

const {
	Command
} = require('commander');
const program = new Command();

program
	.name('jy-cli-service')
	.description('Jy CLI Service')
	.version('0.0.1');

program.command('serve')
	.description('Start webpack-dev-serve')
	.action(() => {
		require('../commands/serve.js')();
	});

program.command('build')
	.description('Build project')
	.action(() => {
		require('../commands/build.js')();
	});
	
program.parse();