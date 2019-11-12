import IOperation from './operation';
import IResult from './result';
import IVariable from './variable';

export default interface IStore {
    builder: IBuilder;
    output: IOutput;
}

export interface IBuilder {
    operations: IOperation[];
    variables: IVariable[];
}

export interface IOutput {
    results: IResult[];
    loader: boolean;
    error: boolean;
}
