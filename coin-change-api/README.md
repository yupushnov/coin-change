# CoinChangeApi

### REST API service for coin-change app.

Created with [Serverless](https://serverless.com/) framework.

## Deployment

1. Make sure you setup your local according to this [article](https://serverless.com/framework/docs/providers/aws/guide/quick-start#pre-requisites).
2. Deploy API:
```bash
> sls deploy
```
3. Wait until the deployment process is finished
4. Go to you AWS account and check out just created [API Gateway Stage](https://console.aws.amazon.com/apigateway/), [Lambdas](https://us-east-1.console.aws.amazon.com/lambda/home) and etc.

## Running unit tests
Run the unit tests using [Jest](https://jestjs.io/) framework:
```bash
> npm t
```

