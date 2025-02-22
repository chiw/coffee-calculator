import { base } from '$app/paths';

export function getFullUrl(path: string): string {
    console.log('getFullUrl path', path);
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

const dirtyFixForGithubPages = (cleanPath: string, basePath: string): string => {
    if (basePath === '..' && cleanPath.startsWith('/coffee-calculator')) {
        return cleanPath.replace('/coffee-calculator', '');
    }
    return cleanPath;
}