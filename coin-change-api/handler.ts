import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { RequestBody } from './src/models/change.model';
import { handleRequest } from './src/utils/aws.utils';
import { getAvailableChange, getOptimalChangeFor, getChangeFor } from './src/services/change.service';

export const ping: APIGatewayProxyHandler = async () => ({
  statusCode: 200,
  body: `${+Date.now()}`,
});

export const availableChange: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('REQUESTING change');
  console.log('event', event);
  console.log('context', context);

  return handleRequest(getAvailableChange);
};

export const optimalChange: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('REQUESTING optimalChange');
  console.log('event', event);
  console.log('context', context);

  const body: RequestBody = JSON.parse(event.body);

  return handleRequest(getOptimalChangeFor, body.euro);
};

export const change: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('REQUESTING change');
  console.log('event', event);
  console.log('context', context);

  const body: RequestBody = JSON.parse(event.body);

  return handleRequest(getChangeFor, body.euro);
};
