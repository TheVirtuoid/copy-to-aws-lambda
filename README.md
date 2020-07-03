# copy-to-aws-lamba
Copies your AWS Lamba source code from your repository to your account's Lamba.

## Installation

Clone this repository.

This is not meant to be a node module at this time. Later, I'll probably make it that way. 
For now, just clone the repository.

## Setup

The first thing you need to do is copy the ```appconfig.sample.js``` file to ```appconfig.js```. 
Then open the ```appconfig.js``` file and make the following changes:

| Setting | Description |
| --- | --- |
| ```credentialsFile``` | Full path name to your AWS credentials file. This app will extract your accessKeyId and secretAccessKey from there. |
| ```AWSParams``` | Settings used by this app to communicate with AWS. |
| ```AWSParams.access.cloud``` | Settings to communicate to AWS on the cloud. ```region``` is the only setting here. ```accessKeyId``` and ```secretAccessKey``` are set from the credentials. |
| ```AWSParams.access.devserver``` | Setting to communicate to a development server. Set ```endpoint``` to the IP address and port of the server. Set ```region``` to ```local```. |
| ```AWSParams.access.local``` | Settting to communicate to a local machine. Set ```endpoint``` to ```localhost``` plus whatever port you are using. Set ```region``` to ```local```. |

That's it. Everything else should be taken care of for you.

Normally, you will place the ```appconfig.js``` file in the same directory as ```copy-to-aws-lambda```. I have mine in a more
common directory - in fact, the directory one level up. This is because I have other AWS helper
apps that run on Node, and they share the same ```appconfig.js``` file. It's all up to you and
how your system is setup.

## Operation

To get the help text:

```text
node lambdapost --help
```  

To copy a file to your AWS cloud:

```text
node lambdapost --file yourFileName --name yourLambdaFunctionName
```

where:

| Setting | Description |
| --- | --- |
| ```--file filepath``` | Path to your lambda function JavaScript file. This can be absolute or relative from the current directory. |
| ```--name lambdaname``` | Name of your lambda function |

**NOTE:** Both ```--file``` and ```--name``` are required.

Example:

```text
node lambdapost -- file ./../aws-devserver/src/lambda/getItem.js --name getItem
```  

Sample output:
```text
--->Completed zipping file D:\DevProjects\aws-devserver\src\getItem.js Total bytes: 479
--->transferred D:\DevProjects\aws-devserver\src\getItem.js to cloud: RevisionId: 01234567-89ab-cdef-0123-456789abcdef
Done!
```

## Dependencies

1. AWS (of course)
2. archiver (for zipping files) - https://github.com/archiverjs/node-archiver

## Questions?

Just ask on the ```Issues``` tab in the Github repository!

