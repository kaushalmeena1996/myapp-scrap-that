import React from 'react';
import { Route, Switch } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Home from '../Home/Home'
import Scraper from '../../containers/Scraper/Scraper'
import About from '../About/About'


const Page: React.FunctionComponent = (): JSX.Element => {
    return (
        <main>
            <Box my={4}>
                <Container maxWidth="lg">
                    <Paper>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/scrap" component={Scraper} />
                            <Route path="/about" component={About} />
                        </Switch>
                    </Paper>
                </Container>
            </Box>
        </main>
    );
}

export default Page;