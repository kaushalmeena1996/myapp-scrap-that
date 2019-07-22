import IValidator from './validator';
import ITable from './result';

export default interface IAction {
    type: string;
    params: {
        index: number;
        type: string;
        name: string;
        value: string;
        table: ITable;
        validators: IValidator[];
    }
}