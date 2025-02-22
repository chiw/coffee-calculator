export const prerender = true;
export const ssr = true;
export const trailingSlash = 'never';

import { i18n } from '$lib/i18n.js';
import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import { dirtyFixFullUrlPath } from '$lib/utils/url.js';

export const load = ({ params }) => {
    console.log('page load', params);

    let path = base + "/recipes/";
    console.log('root pages path', path);

    path = dirtyFixFullUrlPath(path);
    console.log('root pages path after dirty fix', path);

    let i18nResolveRoute = i18n.resolveRoute(path);
    console.log('requires to redirect', path, i18nResolveRoute);

    redirect(302, i18nResolveRoute);
}