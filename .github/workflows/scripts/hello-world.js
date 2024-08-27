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

		core.info(`>>> message: ${process.env.MESSAGE}`)

		core.info(`>>> owner: ${owner}`);
		core.info(`>>> repo: ${repo}`);
		core.info(`>>> issue number: ${issueNumber}`);

		core.info(`>>> issue closing reason: ${context.issue.state_reason}`)

		core.setOutput('OUTPUT_TEST', 'random string for testing!');

		await github.rest.issues.addComment({
			owner,
			repo,
			issue_number: issueNumber,
			labels: 'Hello there! :D',
		});
	} catch (error) {
		core.setFailed(error.message);
	}
};
