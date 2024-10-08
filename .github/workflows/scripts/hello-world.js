// @ts-check
/**
 * @param {Object} params
 * @param {import("@actions/core")} params.core
 * @param {ReturnType<import("@actions/github").getOctokit>} params.github
 * @param {import("@actions/github").context} params.context
 */
module.exports = async ({ core, github, context }) => {
	try {
		const orderId = '93920';
		const envToken = process.env.SHOP_TOKEN || 'no_token_set';

		const orderApi = 'https://store-wp.mui.com/wp-json/wc/v3/orders/';

		core.info(`>>> Order ID: ${orderId}`);
		core.info(`>>> envToken is not set: ${envToken === 'no_token_set'}`);

		const order = await fetch(`${orderApi}${orderId}`, {
			headers: {
				Authorization: `Basic ${envToken}`,
				'User-Agent': 'MUI-Tools-Private/X-Orders-Inspector v1',
			},
		});

		if (!order.ok) {
			core.info(`Request to ${orderApi} failed. Response status code: ${order.status}.`);
		}

		const orderDetails = await order.json();

		core.info(`>>> Order Items: ${orderDetails.line_items?.join(',')}`);

		const plan =
			orderDetails.line_items?.filter((item) => /\b(pro|premium)\b/i.test(item.name))[0].name ||
			'';

		if (!plan) {
			core.info('No Pro or Premium plan found in order');
		}
	} catch (error) {
		core.setFailed(error.message);
	}
};
