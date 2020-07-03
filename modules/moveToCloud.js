const fs = require('fs');

/**
 * Move the ZIP file to the cloud
 * @param state
 * @returns {Promise<state>}
 *
 * State incoming:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    fileNormalized - the file to be processed with full path prepended
 *    name - the name of the lambda function
 *
 * State outgoing:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    fileNormalized - the file to be processed with full path prepended
 *    name - the name of the lambda function
 *    results - result information returned from lamdba.updateFunctionCode call
 *
 */
module.exports = function moveToCloud(state) {
	return new Promise((resolve, reject) => {
		const zipFile = fs.readFileSync(`${state.fileNormalized}.zip`);
		const lambda = new state.AWS.Lambda({apiVersion: '2015-03-31'});
		const args = {
			FunctionName: state.name,
			ZipFile: zipFile
		};
		lambda.updateFunctionCode(args, function(err, data) {
			if (err) {
				reject(err);
			} else {
				console.log(`--->transferred ${state.fileNormalized} to cloud: RevisionId: ${data.RevisionId}`);
				state.results = data;
				resolve(state);
			}
		});
	});
};
