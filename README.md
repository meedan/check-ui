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

When you make changes here and run the build, please be sure to commit the contents of both `lib/` and `.yalc/` as these are necessary for distribution.

## Running test watcher

Some Storybook stories feature Jest test results. In order to see those results within Storybook, it is required to run test watcher in a separate terminal:

```
$ yarn run test:watch
```

or 

```
$ npm run test:watch
```
