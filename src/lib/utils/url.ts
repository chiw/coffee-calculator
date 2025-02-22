import { base } from '$app/paths';

export function getFullUrl(path: string): string {
    console.log('getFullUrl path', path);
    const hostname = typeof window !== 'undefined' ? window.location.origin : '';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const basePath = base || '';
    const fullUrl = `${hostname}${basePath}${cleanPath}`;
    console.log('hostname', hostname, 'cleanPath', cleanPath, 'basePath', basePath);
    console.log('fullUrl', fullUrl);
    return fullUrl;
}