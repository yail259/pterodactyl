import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		status: 302,
		redirect: '/docs/latest'
	};
};
