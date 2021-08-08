export function numbersOnly(oldString: string): string {
    return oldString.replace(/[^\d]/g, "");
}
