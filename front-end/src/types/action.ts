import IResult from "./result";
import IOperation from "./operation";

export default interface IAction {
  type: string;
  params: {
    path: string;
    operation: IOperation;
    mode: string;
    variable: boolean;
    value: string;
    update: string;
    result: IResult;
  };
}
