import IOperation from "./operation";
import IRule from "./rule";

export default interface IInput {
  label: string;
  type: string;
  width: number;
  rows?: number;
  multiline?: boolean;
  update?: number;
  operations?: IOperation[];
  options?: {
    name: string;
    value: string;
  }[];
  rules?: IRule[];
  value?: string;
}
