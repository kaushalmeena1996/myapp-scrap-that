import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import Builder from '../../components/Builder/Builder';
import Configuration from '../../components/Config/Config';
import Output from '../../components/Output/Output';
import classes from './Scrap.module.css';


class Scrap extends React.Component {
    state = {
        tabValue: 1
    }

    handleTabChange(event: React.ChangeEvent<{}>, value: number) {
        this.setState({
            tabValue: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <Paper className={classes.root} square>
                    <Tabs
                        value={this.state.tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange.bind(this)}
                        centered
                    >
                        <Tab label="Config" icon={<SettingsIcon />} />
                        <Tab label="Builder" icon={<BuildIcon />} />
                        <Tab label="Output" icon={<AssignmentIcon />} />
                    </Tabs>
                </Paper>
                <Box p={2}>
                    <Configuration hidden={this.state.tabValue !== 0} />
                    <Builder hidden={this.state.tabValue !== 1} />
                    <Output hidden={this.state.tabValue !== 2} />
                </Box>
            </React.Fragment>
        );
    }
}

export default Scrap;