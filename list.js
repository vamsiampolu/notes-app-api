import * as dynamoDb from './libs/dynamoDb'
import {success, failure} from './libs/response'

export async function main (event, context, callback) {
  const params = {
    TableName: 'notes',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  }

  try {
    const result = await dynamoDb.call('query', params)
    callback(null, success(result.Items))
  } catch (e) {
    callback(null, failure({status: false}))
  }
}
