import { base } from '$app/paths';

export function getFullUrl(path: string): string {
    const hostname = typeof window !== 'undefined' ? window.location.origin : '';
    // Normalize path - remove leading slash if present since base path includes it
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${hostname}${base}/${cleanPath}`.replace(/\/+/g, '/');
}