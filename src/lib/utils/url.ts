import { base } from '$app/paths';

const githubPageRepoName = '/coffee-calculator';

export function getFullUrl(path: string): string {
    console.log('getFullUrl path', path);
    path = dirtyFixFullUrlPath(path);
    console.log('getFullUrl path after dirtyFix', path);

    const hostname = typeof window !== 'undefined' ? window.location.origin : '';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const dirtyFixedCleanPath = dirtyFixForGithubPages(cleanPath, base);
    const basePath = base || '';
    // const fullUrl = `${hostname}${basePath}${cleanPath}`;
    const fullUrl = `${hostname}${basePath}${dirtyFixedCleanPath}`;
    console.log('hostname', hostname, 'dirtyFixedCleanPath', dirtyFixedCleanPath, 'basePath', basePath);
    console.log('fullUrl', fullUrl);
    return fullUrl;
}

const dirtyFixFullUrlPath = (path: string): string => {
    let result = path;
    // if(path.startsWith(githubPageRepoName)) {
        const count = (path.match(new RegExp(githubPageRepoName, "g")) || []).length;
        if(count > 1) {
            console.log('dirtyFixFullUrlPath [' + path + '] contains [' + githubPageRepoName +'] ' + count + ' times, remove the first occurance');
            result = remove_first_occurrence(path, githubPageRepoName);
        }
    // }
    console.log('dirtyFixFullUrlPath path: [' + result + ']');
    return result;
}

const remove_first_occurrence = (str: string, searchstr: string): string => {
	var index = str.indexOf(searchstr);
	if (index === -1) {
		return str;
	}
	return str.slice(0, index) + str.slice(index + searchstr.length);
}

const dirtyFixForGithubPages = (cleanPath: string, basePath: string): string => {
    if (basePath === '..' && cleanPath.startsWith('/coffee-calculator')) {
        return cleanPath.replace('/coffee-calculator', '');
    }
    return cleanPath;
}