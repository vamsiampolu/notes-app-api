import * as dynamoDb from './libs/dynamoDb'
import {success, failure} from './libs/response'

export async function main (event, context, callback) {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDb.call('get', params)
    if (result.Item) {
      callback(null, success(result.Item))
    } else {
      callback(null, failure({status: false, error: 'Item not found.'}))
    }
  } catch (e) {
    callback(null, failure({status: false}))
  }
}
