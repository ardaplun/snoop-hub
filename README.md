# Snoop Hub

This project goal is to search github page easily by search github user name, and it will show users repos. You can also download by zip/tar `(still need CORS fix)`, copy git link for HTTP Clone, and show README.md for earch repo.

This project uses public Github API and have limited access, for example search user only can show up form first 1000 users, only show 30 repos per user, and another limitation.

[Demo](https://githubbox.com/ardaplun/snoop-hub) are the best way to show things.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

It will run test provided by [Jest](https://jestjs.io/) and [@testing-library](https://testing-library.com/). It need to `yarn start` first because it intended to be Unit Testing, but use real data. So, it Semi End-to-end testing also :)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
