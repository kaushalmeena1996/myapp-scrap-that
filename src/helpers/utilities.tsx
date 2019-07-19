import IData from "../types/data";

export const formatHeading = (format: string, outputs: IData): string => {
    return format.replace(/%\w+%/g, function (match: string) {
        return outputs[match.slice(1, -1)] || 'undefined';
    });
}

export const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 8);
}