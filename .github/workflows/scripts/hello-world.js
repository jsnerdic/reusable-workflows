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

		core.setOutput('ipsum', `${process.env.MESSAGE} with random string for testing!`);

		await github.rest.issues.createComment({
			owner,
			repo,
			issue_number: issueNumber,
			body: process.env.MESSAGE,
		});
	} catch (error) {
		core.setFailed(error.message);
	}
};
