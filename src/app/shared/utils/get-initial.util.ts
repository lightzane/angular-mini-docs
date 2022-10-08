/** Retrives the first letters of the name */
export function getInitial(name: string): string {
    const words = name.split(' ');
    let result = '';
    for (let i = 0; i < 2; i++) {
        const word = words[i];
        if (word) {
            result += word.charAt(0).toUpperCase();
        }
    }
    return result;
}
