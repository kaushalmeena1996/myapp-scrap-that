import IParam from './data';
import IValidators from './validator'

export default interface IOperation {
    type: string;
    category: string;
    description: string;
    headingFormat: string;
    heading: string;
    inputs: {
        name: string;
        label: string;
        type: string;
        rows?: number;
        multiline?: boolean;
        width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
        options?: {
            name: string;
            value: string;
        }[]
        validators: IValidators[];
    }[];
    outputs: IParam;
    errors: IParam;
}