export default interface IResult {
    url: string;
    headers: string[];
    rows: (string | number | boolean)[][];
}
