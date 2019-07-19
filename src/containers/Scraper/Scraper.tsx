import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import ScraperBuilder from '../../components/ScraperBuilder/ScraperBuilder';
import ScraperResults from '../../components/ScraperResults/ScraperResults';
import ScraperSettings from '../../components/ScraperSettings/ScraperSettings';
import classes from './Scraper.module.css';

class Scraper extends React.Component {
    state = {
        results: [],
        tabValue: 1,
    }

    handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
        this.setState({
            tabValue: newValue
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
                    <ScraperSettings hidden={this.state.tabValue !== 0} />
                    <ScraperBuilder hidden={this.state.tabValue !== 1} />
                    <ScraperResults hidden={this.state.tabValue !== 2} />
                </Box>
            </React.Fragment>
        );
    }
}

export default Scraper;