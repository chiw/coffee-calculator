import { base } from '$app/paths';

export function getFullUrl(path: string): string {
    const hostname = typeof window !== 'undefined' ? window.location.origin : '';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const basePath = base || '';
    return `${hostname}${basePath}${cleanPath}`;
}