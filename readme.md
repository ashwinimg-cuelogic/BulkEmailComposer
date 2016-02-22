# BulkEmailComposer
This repository contains the node js code for AWS Lambda function to handle the API calls for getting bulk email composer data.
This function gets invoked when there is an event registered on BulkEmailContent Table



###Workflow
Workflow of the library:

1. New record is added in BulkEmailContent table.
2. Triggers the function
3. Function check for the EmailType
4. Depending on the EmailType api call will be given to get the user/ users details to whom the mail is to be sent.
5.if EmailType = newsletter/codealert
    * Update the newsletter recipient count (in case)
    * When the API response has a next page value put a row in the BulkEmailContent table with the same object appended with the next page skip value.
7. Add new record in EmailQueue table using dynamoDB



### Version
1.0.0

### deployment steps 
- You need Grunt installed globally:

```sh
    $ npm install -g grunt
```
- Take the clone of the repository

- install npm packages
```sh
    $ npm install
```
- create .env file with the following settings

    *  KORTINGSCODE_API_URL  = URL
    *  FLIPIT_API_URL       = URL
    *  API_KEY              = API_KEY

- follow the gruntfile.js for various available test and deply command


