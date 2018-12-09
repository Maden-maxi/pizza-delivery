export function jsonParse(str: string): any {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}