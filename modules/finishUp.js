/**
 * Signal the end of the process!
 * @param state
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
module.exports = function finishUp(state) {
	console.log("Done!");
};
