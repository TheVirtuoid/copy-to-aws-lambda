/**
 * THIS IS A SAMPLE APPCONFIG
 *
 * To use this file:
 *    1. Copy it to appconfig.js, in the same directory
 *    2. Go through each of the comments and replace the appropriate data to match your environment
 *
 *  Within my personal implementation, I have this file located in a common directory so that other
 *    CLI utilities I've built can use it. That is why there would seem to be a little overkill
 *    on some of the variables - like the endpoints.
 */
const fs = require('fs');

/**
 * The credentialsFile variable will read you AWS credentials. For Windows machines, this is normally located
 *    in your c:\\users\\<yourname>\\.aws\\credentials directory. Your location may be different
 *
 */
const credentialsFile = fs.readFileSync("c:\\Users\\<yournamehere>\\.aws\\credentials").toString();

/**
 * The AWSParams variable lets you specify different endpoints
 * @type {{access: {cloud: {accessKeyId: string, secretAccessKey: string, region: string}, devserver: {accessKeyId: string, secretAccessKey: string, endpoint: string, region: string}, local: {accessKeyId: string, secretAccessKey: string, endpoint: string, region: string}}}}
 */
let AWSParams = {
	access: {
		// define where your AWS cloud is located. Don't worry about the accessKeyId or secretAccessKey.
		// that is retrieved from your credentials
		cloud: {
			region: 'AWS-region-1',
			accessKeyId: '',
			secretAccessKey: ''
		},
		// a devserver implementation
		// accessKeyId and secretAccessKey doesn't matter
		devserver: {
			region: "local",
			endpoint: "http://your-IP-address:port",
			accessKeyId: 'Nana-Nana-Nana-Nana-Nana-Nana-Nana-Nana',
			secretAccessKey: 'Batman!'
		},
		// a local computer implementation
		// accessKeyId and secretAccessKey doesn't matter
		local: {
			region: "local",
			endpoint: "localhost:port",
			accessKeyId: 'Nana-Nana-Nana-Nana-Nana-Nana-Nana-Nana',
			secretAccessKey: 'Batman!'
		}
	}
};

/**
 * Now that we have the credentials, get the codes and build the variables
 */
const credentials = credentialsFile.split('\r\n');
let index = 0;
while (index < credentials.length && credentials[index] !== "[Publisher]") {
	index++;
}
if (index < credentials.length - 3) {
	const accessKeyId = credentials[index + 1].split('=')[1];
	const secretAccessKey = credentials[index + 2].split('=')[1];
	AWSParams.access.cloud.accessKeyId = accessKeyId;
	AWSParams.access.cloud.secretAccessKey = secretAccessKey;
	AWSParams.access.devserver.accessKeyId = accessKeyId;
	AWSParams.access.devserver.secretAccessKey = secretAccessKey;
	AWSParams.access.local.accessKeyId = accessKeyId;
	AWSParams.access.local.secretAccessKey = secretAccessKey;
}
module.exports = { AWSParams };
