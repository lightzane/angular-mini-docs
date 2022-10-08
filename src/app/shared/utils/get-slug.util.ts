/** Converts the spaces of string in (`-`) dashes */
export function getSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
}
