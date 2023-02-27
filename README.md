# Check UI

React component library and [Storybook documentation](https://meedan.github.io/check-ui/) for the Check App Ecosystem.

## With yarn:

```
$ yarn && yarn start
```

## With npm

```
$ npm install && npm run start
```

## To develop with `check-web`

With the `check-web` docker container running, make whatever changes you need in `check-ui`, then run `npm run build`. Now link the new change in the docker container by running `docker-compose exec web npm run link:ui`. The `check-web` webpack will rebuild and the new build will reflect your changes (you may need to reload your browser running Check).

When you make changes here and are preparing to distribute via npm, please be sure to commit the contents of `lib/` as these are necessary for distribution. Also be sure to increment the `version` field in `package.json`.

Run integration tests on `check-web` as normal.

## To develop with `check-mark`

With the `check-mark` docker container running, make whatever changes you need in `check-ui`, then run `npm run build`. When building `check-mark`, use the `npm run build:check-ui` command instead of the standard `npm run build`.

When you make changes here and are preparing to distribute via npm, please be sure to commit the contents of both `lib/` as these are necessary for distribution. Also be sure to increment the `version` field in `package.json`.

To run integration tests for `check-mark` while developing `check-ui`, temporarily change the `release:test` command in `check-mark` to use `npm run build:check-ui`.

## Running test watcher

Some Storybook stories feature Jest test results. In order to see those results within Storybook, it is required to run test watcher in a separate terminal:

```
$ yarn run test:watch
```

or 

```
$ npm run test:watch
```
