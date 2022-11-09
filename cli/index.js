#!/usr/bin/env node

const {
	Command
} = require('commander');
const program = new Command();
const path = require('path');
const chalk = require('chalk');
const symbols = require('log-symbols');
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');
const execSync = require('child_process').execSync;
const replace = require('replace-in-file');

__dirname = process.cwd();

program
	.name('jy-cli')
	.description('Jy CLI')
	.version('0.0.1');

program.command('create')
	.description('Create a project')
	.argument('[projectName]', 'Prject Name')
	.action((projectName) => {
		if (!projectName) {
			console.log(chalk.red('You need type a project name.\n'));
		} else {
			inquirer
				.prompt([{
					type: 'list',
					name: 'type',
					message: 'Vue version：',
					choices: ['Vue3', 'Vue2'],
				}])
				.then((answers) => {
					let url = 'github:wanls4583/vue3-template';
					if (answers.type == 'Vue2') {
						url = 'github:wanls4583/vue2-template';
					}
					const spinner = ora('Download tempate.').start();
					download(url, path.resolve(__dirname, projectName), (err) => {
						if (err) {
							throw err;
						}
						spinner.succeed('Download succeefully.');
						replace.sync({
							files: path.resolve(__dirname, projectName + '/package.json'),
							from: /\{\{title\}\}/,
							to: projectName
						});
						execSync('npm install', {
							cwd: path.resolve(__dirname, projectName),
							stdio: 'inherit'
						});
						console.log(logSymbols.success, 'Finished successfully!');
						console.log(chalk.green(`1、cd ${projectName}`));
						console.log(chalk.green(`2、npm run serve`));
					});
				})
				.catch((error) => {
					if (error.isTtyError) {
						console.log(chalk.red('Prompt couldn\'t be rendered in the current environment.\n'));
					} else {
						throw error;
					}
				});
		}
	});

program.parse();