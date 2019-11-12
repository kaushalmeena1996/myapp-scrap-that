import IInput from "./input";

export default interface IOperation {
  type: string;
  category: string;
  description: string;
  format: string;
  inputs: IInput[];
}
