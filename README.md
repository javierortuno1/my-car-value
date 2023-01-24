<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
# One specific unit test
$ npm run test:watch
  Example: p -> auth.service.spec

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations with TypeORM CLI
<!-- Script in the package.json-->
"typeorm": "cross-env NODE_ENV=development typeorm-ts-node-commonjs -d src/data-source.ts"

```bash
# generate migration
$ npm run typeorm migration:generate src/migrations/initial-schema

# run migration (TypeOrm cli will know where to look for migrations thanks to migrations: [..] property that we defined in our data-source.ts file)
$ npm run typeorm migration:run
```
<!-- Reference and documentation -->
[nestjs doumentation - where i got the idea of creating typeorm.config.ts and use forRootAsync](https://docs.nestjs.com/techniques/database#async-configuration)

[TypeORM Documentation - where i knew about data source](https://typeorm.io/data-source)

[TypeORM Documentation - where i knew more about migration](https://typeorm.io/migrations)

[Stackoverflow resources - it was helpful when i reached the migration part](https://stackoverflow.com/questions/62821983/typeorm-no-migrations-pending-when-attempting-to-run-migrations-manually)
[Stackoverflow resources - it was helpful knowing i needed to specify the data source file path](https://stackoverflow.com/questions/71625087/typeorm-migration-file-must-contain-a-typescript-javascript-code-and-export-a)

## Deploymen on Heroku
We are going to use the Heroku CLI to deploy our application.

Please follow the instructions here https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up to set up the Heroku CLI on your machine.
npm install -g heroku

The next video will be making use of this CLI, so, set it up right away.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
