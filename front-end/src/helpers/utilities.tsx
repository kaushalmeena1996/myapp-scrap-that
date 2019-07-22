import IData from "../types/data";

export const formatHeading = (format: string, outputs: IData | undefined): string => {
    if (outputs) {
        return format.replace(/%\w+%/g, function (match: string) {
            return outputs[match.slice(1, -1)] || 'undefined';
        });
    } else {
        return 'undefined';
    }
}