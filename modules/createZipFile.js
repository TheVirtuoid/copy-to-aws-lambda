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
 *    name - the name of the AWS Lambda function (required)
 *
 * State outgoing:
 *    args - command line argument list
 *    AWS - pointer to the AWS object
 *    file - the file to be processed (must have had --file filename on command line)
 *    fileNormalized - the full path to the file
 *    name - the name of the lambda function
 *
 *  Please note that the ZIP file will be created in the current directory
 */
module.exports = function createZipFile(state) {
	return new Promise((resolve, reject) => {
		if (!state.file) {
			reject(new Error('--file switch not specified'));
			return;
		}
		if (!state.name) {
			reject(new Error('--name switch not specified'));
			return;
		}
		state.fileNormalized = path.join(process.cwd(), `${state.file}`);
		let output = fs.createWriteStream(`${state.fileNormalized}.zip`);
		let archive = archiver(
			'zip',
			{zlib: {level: 9}}
		);
		output.on('close', function() {
			console.log(`--->Completed zipping file ${state.fileNormalized}. Total bytes: ${archive.pointer()}`);
			resolve(state);
		});
		output.on('end', function() {
			// console.log('Data has been drained');
		});
		archive.on('warning', function(err) {
			fs.unlink(`${state.fileNormalized}.zip`, (err) => {
				reject(err);
			});
		});
		archive.on('error', function(err) {
			fs.unlink(`${state.fileNormalized}.zip`, (err) => {
				reject(err);
			});
		});
		archive.pipe(output);
		archive.file(state.fileNormalized, { name: 'index.js' });
		archive.finalize();
	});
};
