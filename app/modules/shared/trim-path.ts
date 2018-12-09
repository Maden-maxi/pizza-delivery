export function trimPath(path: string) {
    return path.trim().replace(/^\/+|\/+$/g, '');
}