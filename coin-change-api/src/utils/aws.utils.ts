import { APIGatewayProxyResult } from 'aws-lambda';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const handleRequest = (fn: any, ...args): APIGatewayProxyResult => {
  try {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(fn(...args)),
    };
  } catch (error) {
    console.log('ERROR', error);
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
