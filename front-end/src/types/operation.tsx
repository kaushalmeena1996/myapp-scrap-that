import IData from './data';

export default interface IOperation {
    type: string;
    category: string;
    description: string;
    outputFormat: string;
    heading: string;
    inputs: string[];
    outputs: IData;
    errors: IData;
}