import IOperation from './operation';
import IResult from './result';

export default interface IStore {
    operations: IOperations;
    results: IResults;
}

export interface IOperations {
    tasks: IOperation[]
}

export interface IResults {
    tables: IResult[]
    loader: boolean;
    error: boolean;
}
