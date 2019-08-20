
const account = require('banano.account'),
	bip = require('bip39'),
	assert = require('assert'),
	crypto = require('crypto');

const time = (func) => {
	let start = process.hrtime();
	func();
	let end = process.hrtime(start);
	return (end[0] * 1e9 + end[1]) / 1e9;
};

class Mass {

	constructor(option = {}) {
		this.option = {
			count: 10,
			mnemonic: true,
			key: 32,
			pad: true,
			debug: false,
			...option
		};
		this.option.key = Math.min(Math.max(this.option.key, 1), 64);
		if (this.option.debug) {
			console.log('options:', this.option);
		}
	}

	create(entropy) {
		let hex = (entropy || crypto.randomBytes(this.option.key)).toString('hex');
		if (this.option.pad) {
			hex = hex.padEnd(64, '0');
		}
		const mnemonic = bip.entropy.toMnemonic(hex),
			acc = account.create(hex, 0);

		let o = {
			entropy: hex,
			mnemonic: mnemonic,
			raw: acc
		};
		assert.equal(hex, (this.option.pad) ? o.raw.seed : o.raw.seed.substr(0, this.option.key * 2));
		return o;
	}

	mass() {
		let out = {};
		let t = time(() => {
			for (let i = 0; i < this.option.count; i++) {
				let entry = this.create();
				out[entry.raw.account] = [entry.entropy, this.option.mnemonic ? entry.mnemonic.join(' ') : entry.mnemonic];
			}
		});
		if (this.option.debug) {
			console.log(`${t.toFixed(3)}sec for ${this.option.count} accounts`);
		}
		return out;
	}

}

module.exports = Mass;
