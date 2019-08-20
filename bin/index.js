#!/usr/bin/env node

const Mass = require('../index.js'),
	color = require('console.color'),
	{Cli, Map} = require('cli.util');

let argv = process.argv;
let cli = new Cli(argv, [
	new Map('count')
		.alias(['c', 'C'])
		.arg(),
	new Map('mnemonic')
		.alias(['m', 'M']),
	new Map('key-size')
		.alias(['k', 'K'])
		.arg(),
	new Map('seed-pad')
		.alias(['p', 'P']),
	new Map('raw')
		.alias(['r', 'R'])
		.arg(),
	new Map('format')
		.alias(['f', 'F'])
		.arg(),
	new Map('debug'),
	new Map('help')
		.alias(['h', 'H'])
], 1);

if (cli.has('help')) {
	console.log([
		color.green('Param:'),
		`	--count $1 | -c $1			[${color.cyan('changes how many accounts are made')}]`,
		`	--mnemonic | -m				[${color.cyan('disable join on mnemonic for json format')}]`,
		`	--key-size $1 | -k $1 			[${color.cyan('change key size 1-64')}]`,
		`	--seed-pad | -p 			[${color.cyan('use the seed as a seed to pad or pad with zeros')}]`,
		`	--raw | -r 				[${color.cyan('json output is raw of prettified')}]`,
		`	--format json|csv | -f $1 		[${color.cyan('what format to output')}]`,
		`	--help | -h				[${color.cyan('output help')}]`,
		`	--debug | -g				[${color.cyan('show debug')}]`,
		'',
		color.green('Example:'),
		color.white('	bmass -c 100 > dump.json'),
		'',
		color.white('	bmass --count 100 --format json --raw --mnemonic --seed-pad > dump.json'),
		color.white('	bmass -c 100 -f json -rmp > dump.json'),
		color.white('	bmass -c 100 -f json -rmp --debug')
	].join('\n'));
} else {
	const format = cli.get('format') || 'json';
	const options = {
		count: Number(cli.get('count')) || 1,
		mnemonic: format === 'csv' ? true : !cli.has('mnemonic'),
		pad: cli.has('seed-pad'),
		debug: cli.has('debug')
	};
	if (cli.has('key-size')) {
		options.key = Number(cli.get('key-size'));
		if (options.key < 16) {
			options.pad = true;
		}
	}
	let data = new Mass(options).mass();

	if (cli.has('debug')) {
		return;
	}
	if (format === 'json') {
		return process.stdout.write(cli.has('raw') ? JSON.stringify(data) : JSON.stringify(data, null, '\t'));
	}
	if (format === 'csv') {
		let csv = '';
		for (let i in data) {
			csv += `${i},${data[i][0]},${data[i][1]}\n`;
		}
		return process.stdout.write(csv);
	}
	console.log(color.red('wrong format type --format json|csv'));
}
