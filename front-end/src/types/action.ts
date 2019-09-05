import IValidator from './validator';
import IResult from './result';

export default interface IAction {
    type: string;
    params: {
        index: number;
        type: string;
        name: string;
        value: string;
        result: IResult;
        validators: IValidator[];
    }
}