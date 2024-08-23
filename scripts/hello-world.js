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

		const label = await github.rest.issues.getLabel({
			owner,
			repo,
			name: ['help wanted'],
		});

		core.info(`>>> Label: ${label}`);

		await github.rest.issues.addLabels({
			owner,
			repo,
			issue_number: issueNumber,
			labels: ['documentation'],
		});
	} catch (error) {
		core.setFailed(error.message);
	}
};
