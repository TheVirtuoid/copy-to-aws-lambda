/**
 * Displays the Help file
 * @param state
 * @returns {Promise<state>}
 *
 * No changes made to the state
 */
module.exports = function displayHelp(state) {
	return new Promise( (resolve, reject) => {
		console.log(`
LAMBDAPOST - Copy Lambda functions to AWS

Commands:
	--help              this help screen
	--file fileName     The filename to process
	--name lambdaName   The name of the lambda function

Application copyright 2020 and onwards m.parker smith a.k.a. TheVirtuoid
All Rights Reserved
Licensed under the MIT License. Enjoy!
`);
	resolve(state);
	});
}
