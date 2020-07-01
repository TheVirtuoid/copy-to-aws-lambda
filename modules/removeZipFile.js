const fs = require('fs');
const path = require('path');

/**
 * Removes the ZIP file from the directory
 * @param state
 * @returns {Promise<state>}
 *
 * State incoming:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    results - result information returned from lamdba.updateFunctionCode call
 *
 * State outgoing:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    results - result information returned from lamdba.updateFunctionCode call
 *
 */
module.exports = function removeZipFile(state) {
	return new Promise( (resolve, reject) => {
		fs.unlink(path.join(process.cwd(), `${state.file}.zip`), (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(state);
			}
		});
	});
}
