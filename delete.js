import * as dynamoDb from './libs/dynamoDb'
import {success, failure} from './libs/response'

export async function main (event, context, callback) {
  const userId = event.requestContext.identity.cognitoIdentityId
  const noteId = event.pathParameters.id

  const params = {
    TableName: 'notes',
    Key: {
      userId,
      noteId
    }
  }

  try {
    const result = await dynamoDb.call('delete', params)
    console.log('RESULT', result)
    callback(null, success({status: true}))
  } catch (e) {
    callback(null, failure({status: false}))
  }
}
