# weightwatcherapp
A web application to monitor weight for users built using AWS-S3, API Gateway, Lambda and Dynamodb.

#Using the application
Main webpage displays the form to enter the user's weight on a particular date in YYYY-MM-DD format.
URL for the web app: http://vsaman-weightwatcherapp.s3-website-us-east-1.amazonaws.com/

Main form consists of three input fields-username, weight and recorded date. User can enter the values for the three fields, and submit the information by clicking the submit button.

When the form data is submitted, the weight is recorded in the Dynamodb table. The post method invokes the API Gateway Rest API(Post method) which invokes a Lambda function, and writes the weight, and recorded date for the user in the Dynamodb table.

Another form on the same page will get all the user's weights that were recorded and display it as a graph.

User enters the username and when the 'Get Progress' button is clicked, a chart is displayed with the weight on y-axis and dates on x-axis.

The data is obtained via Get API call, which invokes Lambda function to obtain data from Dynamodb table.

#Setting up the application

S3 - Create an S3-bucket with public read access and static website hosting enabled. The website files are served from this bucket.
The domain can be set up using Route53 pointing to the bucket. Domain is not set up for this website.
Below are the files:
index.html - Main html file with forms
form.js - Javascript file for the post and get Ajax API calls.
main.css - Styling for the elements on page.

API Gateway - Define a resource in API Gateway(ex:weightwatcher-api) and define POST (weightwatcher-api/POST) method. Set the invocation type to Lambda, and provide the Lambda function name.
Define a GET method for the resource(weightwatcher-api/{userName}/GET) method. Set the invocation type to Lambda, and provide the Lambda function name. Enable CORS for the methods.

Lambda function - Create IAM role for the Lambda function to access the Dynamodb weightwatcher-table.(with IAM policy that allows read, write to Dynamodb table and enable logs)
Create the Lambda function with the role attached to it. The index.js(Node.js.8.10)script provides the code for the Lambda function to read and write to the Dynamodb table.
Environment variable to set for the Lambda function:
TABLE - weightwatcher-table (name of the table in Dynamodb)

Dynamodb table - Create a table in Dynamodb with userName, weight and recordDate(with primary partition key as username and sort key as recordDate) as fields to record user weight data.
