/**
 * @param {Object} params
 * @param {import("@actions/core")} params.core
 * @param {ReturnType<import("@actions/github").getOctokit>} params.github
 * @param {import("@actions/github").context} params.context
 * @param {any} params.inputs
 */
module.exports = async ({ core, github, context }) => {
	try {
		const owner = context.repo.owner;
		const repo = context.repo.repo;
		const issueNumber = context.issue.number;

		const inputs = github.event.inputs
		const testString = core.getInput('message')

		core.info(`>>> inputs: ${JSON.stringify(inputs)}`)
		core.info(`>>> message: ${testString}`)

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
