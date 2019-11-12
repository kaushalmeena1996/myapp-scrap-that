import IParams from "./params";

export default interface IRule {
    type: string,
    message: string
    params?: IParams
}
