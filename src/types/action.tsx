import IValidator from './validator';
import IData from './data';

export default interface IAction {
    type: string;
    id: string;
    typeId: string;
    name: string;
    value: string;
    data: IData;
    validators: IValidator[];
}