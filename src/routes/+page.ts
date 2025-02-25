export const prerender = true;
export const ssr = true;
export const trailingSlash = 'never';

import { i18n } from '$lib/i18n.js';
import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
	console.log('page load', params);

	const path = base + '/recipes';
	console.log('root pages path', path);

	const i18nResolveRoute = i18n.resolveRoute(path);
	console.log('requires to redirect', path, i18nResolveRoute);

	redirect(302, i18nResolveRoute);
};
