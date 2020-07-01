const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * Creates the ZIP file of the outgoing Lambda function
 * @param state Application State
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
 *
 *  Please note that the ZIP file will be created in the current directory
 */
module.exports = function createZipFile(state) {
	return new Promise((resolve, reject) => {
		if (!state.file) {
			reject(new Error('--file switch not specified'));
		} else {
			let output = fs.createWriteStream(path.join(process.cwd(), `${state.file}.zip`));
			let archive = archiver(
				'zip',
				{zlib: {level: 9}}
			);
			output.on('close', function() {
				console.log(`--->Completed zipping files. Total bytes: ${archive.pointer()}`);
				resolve(state);
			});
			output.on('end', function() {
				// console.log('Data has been drained');
			});
			archive.on('warning', function(err) {
				if (err.code === 'ENOENT') {
					console.log(`****WARNING!!`, err);
				} else {
					throw err;
				}
			});
			archive.on('error', function(err) {
				throw err;
			});
			archive.pipe(output);
			archive.file(`${state.file}.js`, { name: 'index.js' });
			archive.finalize();
		}
	});
};
