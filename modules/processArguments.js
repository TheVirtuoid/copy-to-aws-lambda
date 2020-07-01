/**
 * Process the command line arguments
 * @param state - Application state
 * @returns {Promise<state>}
 *
 * State incoming:
 *    args - argument list from the command line
 *    AWS - pointer to AWS object
 *
 * State outgoing:
 *    args - argument list from the command line
 *    AWS - pointer to AWS object
 *    <cmd> - The command's value
 *        A command is any syntax specified thusly: --command
 *        The value associated with the command is the data immediately following the command
 *        "--test foobar" sets state[test] = foobar;
 *        If there is no value, then the command is set to be true
 *        "--test --foobar" set state[test] = true;
 *
 *        There can be any number of commands on the command line. Only those recognized will be processed.
 *        All others will be ignored.
 */
module.exports = function processArguments(state) {
	return new Promise((resolve, reject) => {
		let cmd = "";
		while (state.args.length) {
			const arg = state.args.shift();
			if (arg.startsWith('--')) {
				if (cmd !== "") {
					state[cmd] = true;
				}
				cmd = arg.substring(2);
			} else if (cmd !== "") {
				state[cmd] = arg;
				cmd = "";
			}
		}
		resolve(state);
	});
};
