import IData from './data';

export default interface IOperation {
    id?: string;
    typeId: string;
    categoryId: string;
    typeName: string;
    description: string;
    outputFormat: string;
    heading?: string;
    inputs: string[];
    outputs: IData;
    errors?: IData;
}