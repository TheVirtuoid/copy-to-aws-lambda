const fs = require('fs');
const path = require('path');

/**
 * Move the ZIP file to the cloud
 * @param state
 * @returns {Promise<state>}
 *
 * State incoming:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *
 * State outgoing:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    results - result information returned from lamdba.updateFunctionCode call
 *
 */
module.exports = function moveToCloud(state) {
	return new Promise((resolve, reject) => {
		const zipFile = fs.readFileSync(path.join(process.cwd(), `${state.file}.zip`));
		const lambda = new params.AWS.Lambda({apiVersion: '2015-03-31'});
		const args = {
			FunctionName: state.file,
			ZipFile: zipFile
		};
		lambda.updateFunctionCode(args, function(err, data) {
			if (err) {
				reject(err);
			} else {
				console.log(`--->transferred to cloud: RevisionId: ${data.RevisionId}`);
				state.results = data;
				resolve(state);
			}
		});
	});
};
