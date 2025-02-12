// @ts-check
/**
 * @param {Object} params
 * @param {import("@actions/core")} params.core
 * @param {ReturnType<import("@actions/github").getOctokit>} params.github
 * @param {import("@actions/github").context} params.context
 */
module.exports = async ({ core, context, github }) => {
	try {
		const owner = context.repo.owner;
		const repo = context.repo.repo;
		const issueNumber = context.issue.number;

		core.info(`>>> Context: issue number: ${issueNumber}`);

		const issue = await github.rest.issues.get({
			owner,
			repo,
			issue_number: issueNumber,
		});

		core.info(`>>> Fetch: Issue number: ${issue.data.number}`);
		core.info(`>>> Fetch: Issue title: ${issue.data.title}`);
		core.info(`>>> Fetch: Issue state: ${issue.data.state}`);
		core.info(`>>> Fetch: Issue state reason: ${issue.data.state_reason}`);
	} catch (error) {
		core.error(`>>> Workflow failed with: ${error.message}`);
		core.setFailed(error.message);
	}
};
