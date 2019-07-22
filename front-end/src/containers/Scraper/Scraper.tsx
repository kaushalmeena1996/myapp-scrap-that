import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import Builder from '../../components/Builder/Builder';
import Result from '../../components/Result/Result';
import Setting from '../../components/Setting/Setting';
import classes from './Scraper.module.css';

class Scraper extends React.Component {
    state = {
        tabValue: 1,
    }

    handleTabChange(event: React.ChangeEvent<{}>, value: number) {
        this.setState({
            tabValue: value
        });
    }

    handleIFrameShow() {
        this.setState({
            iframeVisible: true
        });
    }

    handleIFrameHide() {
        this.setState({
            iframeVisible: false
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
                        <Tab label="Settings" icon={<SettingsIcon />} />
                        <Tab label="Builder" icon={<BuildIcon />} />
                        <Tab label="Results" icon={<AssignmentIcon />} />
                    </Tabs>
                </Paper>
                <Box p={2}>
                    <Setting hidden={this.state.tabValue !== 0} />
                    <Builder hidden={this.state.tabValue !== 1} />
                    <Result hidden={this.state.tabValue !== 2} />
                </Box>
            </React.Fragment>
        );
    }
}

export default Scraper;