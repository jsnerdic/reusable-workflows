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
		const pullNumber = context.issue.number;

		core.info(`>>> context data: ${JSON.stringify(context)}`);

		const { data: pr} = await github.rest.pulls.get({
			owner,
			repo,
			pull_number: pullNumber,
		});

		core.info(`>>> PR data: ${JSON.stringify(pr)}`);
		core.info(`>>> PR fetched: ${pr.id}`);
	} catch (error) {
		core.error(`>>> Workflow failed with: ${error.message}`);
		core.setFailed(error.message);
	}
};
