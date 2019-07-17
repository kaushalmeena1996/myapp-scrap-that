import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ScrapperSvg from '../../assets/svg/scraper.svg'

import classes from './Home.module.css';

const Home: React.FunctionComponent = () => {
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <img src={ScrapperSvg} alt="Logo" className={classes.image} />
                </Grid>
                <Grid item xs={8} sm={6}>
                    <Typography variant="h2" gutterBottom>ScrapThat!</Typography>
                    <Typography variant="h5" gutterBottom>
                        Makes web scrapping easier than ever.
                        </Typography>
                    <Button variant="outlined" color="primary">Get Started</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;