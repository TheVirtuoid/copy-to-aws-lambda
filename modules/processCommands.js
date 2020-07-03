const displayHelp = require('./displayHelp');
const moveToCloud = require('./moveToCloud');
const createZipFile = require('./createZipFile');
const removeZipFile = require('./removeZipFile');

module.exports = function processCommands(state) {
	return new Promise( (resolve, reject) => {
		if (state.help) {
			displayHelp(state)
				.then(resolve)
				.catch(reject);
 		} else if (state.file) {
			createZipFile(state)
				.then(moveToCloud)
				.then(removeZipFile)
				.then(resolve)
				.catch(reject);
		} else if (state.all) {

		} else {
			reject(new Error(`No known command specified. Please check your syntax and try again.\nUse "--help" for a list of commands.`));
		}
	});
}
