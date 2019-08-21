
[logo]: https://banano.cc/assets/bananologo.svg "BANANO"
![alt text][logo]

### `Intro`
Cli to mass create Banano accounts with public address, mnemonic and seed;

#### `Install`
- Node module
``` bash
npm install --save git+https://github.com/anzerr/banano.mass.git
```
- Cli
``` bash
git clone git+https://github.com/anzerr/banano.mass.git &&
cd banano.mass &&
npm i && npm link
```
- Docker image
``` bash
docker run --rm -it anzerr/bmass -c 100 -f json -rmp > dump.json
```

### `Cli`
``` bash
bmass -c 100 > dump.json
bmass --count 100 --format json --raw --mnemonic --seed-pad > dump.json
bmass -c 100 -f json -rmp > dump.json
bmass -c 100 -f json -rmp --debug
```

##### `Output`
using `--format json`
``` json
{
        "ban_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7": [
                "0000000000000000000000000000000000000000000000000000000000000000",
                "abandon abandon ..."
        ],
		"ban_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7": [
                "0000000000000000000000000000000000000000000000000000000000000000",
                "abandon abandon ..."
        ]
}
```
using `--format csv`
``` csv
ban_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7,0000000000000000000000000000000000000000000000000000000000000000,abandon ...
ban_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7,0000000000000000000000000000000000000000000000000000000000000000,abandon ...
```
using `--debug`
```
options: { count: 500, mnemonic: true, key: 0, pad: true, debug: true }
1.713sec for 500 accounts
```

### `Module`
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