# abacash [![Build status](https://ci.frigg.io/badges/abakusbackup/abacash/)](https://ci.frigg.io/abakusbackup/abacash/last/) [![Coverage status](https://ci.frigg.io/badges/coverage/abakusbackup/abacash/)](https://ci.frigg.io/abakusbackup/abacash/last/)

## Usage
```bash
$ npm run watch
# Or without reloading:
$ npm start
```

## Tests

```bash
$ npm test
```

To run tests with file watch:
```bash
$ npm run test:watch
```

To run a test a subset of the tests:
```bash
$ npm test -- -g *pattern*
```
Here, *pattern* is a regex for the test descriptions. This also works on `npm run test:watch`.

