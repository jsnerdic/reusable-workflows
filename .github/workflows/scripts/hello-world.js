/**
 * @param {Object} params
 * @param {import("@actions/core")} params.core
 * @param {ReturnType<import("@actions/github").getOctokit>} params.github
 * @param {import("@actions/github").context} params.context
 */
module.exports = async ({ core, github, context }) => {
	try {
		const owner = context.repo.owner;
		const repo = context.repo.repo;
		const issueNumber = context.issue.number;

		core.info(`>>> count: ${process.env.COUNT}`)

		const countTransfer = process.env.COUNT + 1
		core.info(`>>> countTransfer: ${countTransfer}`)

		core.info(`>>> owner: ${owner}`);
		core.info(`>>> repo: ${repo}`);
		core.info(`>>> issue number: ${issueNumber}`);

		core.setOutput('countTransfer', `${countTransfer}`);
	} catch (error) {
		core.setFailed(error.message);
	}
};
