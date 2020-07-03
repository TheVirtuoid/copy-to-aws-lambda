const processArguments = require('./modules/processArguments');
const processCommands = require('./modules/processCommands');
const finishUp = require('./modules/finishUp');
const gotError = require('./modules/gotError');

const { AWSParams } = require('./appconfig');
let AWS = require("aws-sdk");
AWS.config.update(AWSParams.access.cloud);
let state = {args: process.argv, AWS: AWS};

processArguments(state)
	.then(processCommands)
	.then(finishUp)
	.catch(gotError);
