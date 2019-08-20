
### `Intro`
Cli to mass create Banano accounts with public address, mnemonic and seed;

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/banano.mass.git
```

``` bash
git clone git+https://github.com/anzerr/banano.mass.git &&
cd banano.mass &&
npm link
```

### `Example`

``` bash
bmass -c 100 > dump.json
bmass --count 100 --format json --raw --mnemonic --seed-pad > dump.json
bmass -c 100 -f json -rmp > dump.json
bmass -c 100 -f json -rmp --debug
```

``` javascript
const Mass = require('banano.mass');

let m = new Mass({
	count: 10,
	mnemonic: true,
	key: 32,
	pad: true,
	debug: false,
});
console.log(m.create(Buffer.alloc(16, 0x11)));
console.log(m.create());
console.log(m.mass());
```