# abacash-api [![Build status](https://ci.frigg.io/badges/abakusbackup/abacash-api/)](https://ci.frigg.io/abakusbackup/abacash-api/last/) [![Coverage status](https://ci.frigg.io/badges/coverage/abakusbackup/abacash-api/)](https://ci.frigg.io/abakusbackup/abacash-api/last/)

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

## Load database with test data
```
$ npm run load-data
```
Will fill the `abacash` postgres database with fixtures from `./fixtures/`. Connection string can be set by setting environment variable `PG_URL`. Contents in the `fixtures` are not (and should not be) used for automatic testing, which means the fixtures can be edited to test the client.

## Transfer data from existing Mongodb documents
```
$ node scripts/transfer.js -d *database url* -s *system id* [-k] 
```
The `-d` and `-s` options are required, `-k` is optional. The options are defined like this:
```
.option('-d, --database [value]', 'MongoDB connection string (i.e. mongodb://localhost:27017/labamba')
.option('-s, --system-id <n>', 'System ID to transfer to')
.option('-k, --keep-stock', 'Keep stock?')
```
The transfer script is dependent on an existing system.
