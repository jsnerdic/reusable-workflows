// @ts-check
/**
 * @param {Object} params
 * @param {import("@actions/core")} params.core
 * @param {ReturnType<import("@actions/github").getOctokit>} params.github
 * @param {import("@actions/github").context} params.context
 */
module.exports = async ({ core, context, github }) => {
	try {
		core.setOutput('TEST_OUT1', ['a1', 'b1']);
		core.setOutput('TEST_OUT2', ['a2', 'b2']);
	} catch (error) {
		core.error(`>>> Workflow failed with: ${error.message}`);
		core.setFailed(error.message);
	}
};
