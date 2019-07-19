import IOperation from './operation';

export default interface IStore {
    operations: IOperation[];
    results: any[];
}