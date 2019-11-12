import Switch from "@material-ui/core/Switch";
import React from "react";

export interface IConfigProps {}

const Setting: React.FunctionComponent<IConfigProps> = (
  props: IConfigProps
): JSX.Element => {
  return (
    <div>
      <Switch value="checked" color="primary" />
    </div>
  );
};

export default Setting;
