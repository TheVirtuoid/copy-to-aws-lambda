const processArguments = require('./modules/processArguments');
const createZipFile = require('./modules/createZipFile');
const moveToCloud = require('./modules/moveToCloud');
const finishUp = require('./modules/finishUp');
const gotError = require('./modules/gotError');
const removeZipFile = require('./modules/removeZipFile');

const { AWSParams } = require('./appconfig');
let AWS = require("aws-sdk");
AWS.config.update(AWSParams.access.cloud);
let state = {args: process.argv, AWS: AWS};

processArguments(state)
	.then(createZipFile)
	.then(moveToCloud)
	.then(removeZipFile)
	.then(finishUp)
	.catch(gotError);
