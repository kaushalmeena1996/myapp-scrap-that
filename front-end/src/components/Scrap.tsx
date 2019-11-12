import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BuildIcon from "@material-ui/icons/Build";
import SettingsIcon from "@material-ui/icons/Settings";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import Builder from "../containers/Builder";
import Configuration from "./Config";
import Output from "../containers/Output";

const Scrap: React.FunctionComponent = (): JSX.Element => {
  const [value, setValue] = React.useState<number>(1);

  function handleTabChange(event: unknown, value: number) {
    setValue(value);
  }

  return (
    <React.Fragment>
      <Paper className={css(styles.paper)} square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          centered
        >
          <Tab label="Config" icon={<SettingsIcon />} />
          <Tab label="Builder" icon={<BuildIcon />} />
          <Tab label="Output" icon={<AssignmentIcon />} />
        </Tabs>
      </Paper>
      <Box p={2}>
        {value === 0 && <Configuration />}
        {value === 1 && <Builder />}
        {value === 2 && <Output />}
      </Box>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  paper: {
    flexGrow: 1
  }
});

export default Scrap;
