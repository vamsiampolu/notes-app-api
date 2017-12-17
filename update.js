import * as dynamoDb from './libs/dynamoDb'
import {success, failure} from './libs/response'

export async function main (event, context, callback) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: 'notes',
    Key: {
      noteId: event.pathParameters.id,
      userId: event.requestContext.identity.cognitoIdentityId
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment ? data.attachment : null,
      ':content': data.content ? data.content : null
    },
    ReturnValues: 'ALL_NEW'
  }

  try {
    const result = await dynamoDb.call('update', params)
    console.log('RESULT', result)
    callback(null, success({status: true}))
  } catch (e) {
    console.log('Error', e)
    callback(null, failure({status: false}))
  }
}
