import { base } from '$app/paths';

export function getFullUrl(path: string): string {
    const hostname = typeof window !== 'undefined' ? window.location.origin : '';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${hostname}${base}${cleanPath}`;
}

export function dirtyFixFullUrlPath(path: string): string {
    // Remove trailing slash if present
    let fixedPath = path.endsWith('/') ? path.slice(0, -1) : path;
    // Remove leading slash if present
    fixedPath = fixedPath.startsWith('/') ? fixedPath.slice(1) : fixedPath;
    return fixedPath;
}