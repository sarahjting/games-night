<p align="center">
  <img src="https://raw.githubusercontent.com/sarahjting/games-night/master/public/img/games-night-logo.jpg">
</p>

# Games Night

This was created during my time as a student at Code Chrysalis!

> "Who starts?"
> "Whoever won last week."
> "Who was that again?"

> "Who's washing the dishes?"
> "Whoever lost the last game."
> "Who remembers that?"

Ever ran into this scenario? Not anymore! This app keeps track of your games nights and your scoreboards, so your losers have no more excuses for forgetting to bring drinks in the next week.

# Installation

1. Install dependencies using yarn.

```
yarn
```

2. Don't forget to set up your `.env` using `.env.default`!
3. Set up and seed database.

```
yarn migrate && yarn seed
```

4. Build files & start the server.

```
yarn start
```

5. By default, the front-end will be served at `http://localhost:3000`, and the graphQL playground & API at `http://localhost:3000/api`.

# Testing

```
yarn test:server
```

# Libraries Used

- Back-end
  - GraphQL, Apollo/Express server for serving the backend
  - Knex for the query builder
  - Mocha/Chai for tests
- Front-end
  - Vue components framework
  - Vuex state management
  - Vuetify UI framework
- Utilities
  - Axios for fetching data from the back-end API, and for downloading random profile images
  - dotenv for loading environment variables
  - moment.js for formatting dates
  - nodemon for serving the backend

# Authors

- Sarah Ting: Tech Lead
- Potato: Moral support
- McDonalds: Spiritual support
