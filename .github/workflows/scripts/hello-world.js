/**
 * We import these just for type checking as the actual imports
 * are passed as arguments to the function
 * https://github.com/marketplace/actions/github-script#run-a-separate-file
 */
module.exports = async ({ core, github, context }) => {
	try {
		const owner = context.repo.owner;
		const repo = context.repo.repo;
		const issueNumber = context.issue.number;
		const inputs = github.event.inputs

		core.info(`>>> inputs: ${JSON.stringify(inputs)}`)

		core.info(`>>> owner: ${owner}`);
		core.info(`>>> repo: ${repo}`);
		core.info(`>>> issue number: ${issueNumber}`);

		core.info(`>>> issue closing reason: ${context.issue.state_reason}`)

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
