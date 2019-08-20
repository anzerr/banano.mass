
const Mass = require('../index.js'),
	bip = require('bip39'),
	assert = require('assert');

(() => {
	let m = new Mass({pad: false, key: 16});
	const o = m.create(Buffer.alloc(16, 0x11));
	assert.equal(o.entropy, bip.mnemonic.toEntropy(o.mnemonic));
	m = new Mass({count: 8});
	assert.equal(Object.keys(m.mass()).length, 8);
})();
