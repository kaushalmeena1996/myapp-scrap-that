import IOperation from './operation';
import IResult from './result';

export default interface IStore {
    builder: IBuilder;
    output: IOutput;
}

export interface IBuilder {
    operations: IOperation[]
}

export interface IOutput {
    results: IResult[]
    loader: boolean;
    error: boolean;
}
