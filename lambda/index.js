const AWS = require('aws-sdk');
const table = process.env.TABLE;

exports.handler = async(event,context,callback) => {

    console.log(JSON.stringify(event, null, 2));
    context.callbackWaitsForEmptyEventLoop = false;

    var docClient = new AWS.DynamoDB.DocumentClient();

    if (event.httpMethod === 'POST') {
       var inputparams = JSON.parse(event.body);

       var params = {
            TableName: table,
            Item: {
                "userName" : inputparams.userName,
                "weight" : inputparams.weight,
                "recordDate" : inputparams.recordDate
            }
        };

        await docClient.put(params).promise();
          return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "http://vsaman-weightwatcherapp.s3-website-us-east-1.amazonaws.com", //Required for CORS support to work
              "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
              "Access-Control-Allow-Credentials" : true,
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(inputparams)
          };
    }
    if(event.httpMethod == "GET") {
        let userName = event.pathParameters.userName;

        return new Promise((resolve, reject) => {
          let params = {
             TableName : table,
             FilterExpression : `userName = :userName`,
             ExpressionAttributeValues : { ':userName': userName }
          };

          docClient.scan(params, function(err, data) {
                if (err) {callback(err, null);}
                resolve(data);

                var response = {
                  statusCode: 200,
                  headers : {
                   "Access-Control-Allow-Origin" : "http://vsaman-weightwatcherapp.s3-website-us-east-1.amazonaws.com", //Required for CORS support to work
                   'Access-Control-Allow-Headers' :'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                   'Access-Control-Allow-Credentials' : true,
                   'Content-Type' : 'application/json'
                   },
                   "body" : JSON.stringify(data),
                   "isBase64Encoded" : false
                };

                callback(null, response);
            });
         });
      }
}
