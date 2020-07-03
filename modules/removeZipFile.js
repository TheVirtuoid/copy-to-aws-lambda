const fs = require('fs');

/**
 * Removes the ZIP file from the directory
 * @param state
 * @returns {Promise<state>}
 *
 * State incoming:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    fileNormalized - the file with the full path prepended
 *    name - the name of the lambda function
 *    results - result information returned from lamdba.updateFunctionCode call
 *
 * State outgoing:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    fileNormalized - the file with the full path prepended
 *    name - the name of the lambda function
 *    results - result information returned from lamdba.updateFunctionCode call
 *
 */
module.exports = function removeZipFile(state) {
	return new Promise( (resolve, reject) => {
		fs.unlink(`${state.fileNormalized}.zip`, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(state);
			}
		});
	});
}
