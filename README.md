# AbaCash API [![Build status](https://ci.frigg.io/badges/abakusbackup/abacash-api/)](https://ci.frigg.io/abakusbackup/abacash-api/last/) [![Coverage status](https://ci.frigg.io/badges/coverage/abakusbackup/abacash-api/)](https://ci.frigg.io/abakusbackup/abacash-api/last/)

## Getting Started
```bash
# With reloading (development):
$ npm run start:watch

# Or without reloading (production):
$ npm run build
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
-h, --help              output usage information
-V, --version           output the version number
-d, --database [value]  MongoDB connection string (i.e. mongodb://localhost:27017/labamba
-s, --system-id <n>     System ID to transfer to
-k, --keep-stock        Keep stock?
```
The transfer script is dependent on an existing system.

## License
The MIT License (MIT)

Copyright (c) 2016 Abakus backup <backup@abakus.no>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
