# Coin Change

### Simple coin-change app written in Serverless + Node.js (TypeScript) + Angular 8 and hosted on AWS.
Implements the logic for a vending machine that will return the optimal change for a given number of Euro.

### Visit [website](https://17o6jrnrxj.execute-api.us-east-1.amazonaws.com/production/) for live demo.

## How to use

- Switch the toggle button to enable/disable "optimal change" mode.
- Add amount in Euro that you want to change
- Input should be a numeric value with two digits after the decimal point
- The error is shown when the requested amount is higher than the available number of coins

### Things to improve

- [ ] Better README file (App & API)
- [ ] Add JSDoc where it's missing (API)
- [ ] Add e2e/integration tests (App & API)
- [ ] Move inputs from `app.component` to the separate component(s) (App)
- [ ] Move `baseUrl` from the service to `.env` file (App)
- [ ] Add more unit tests (App)
- [ ] Better error handling (App)

