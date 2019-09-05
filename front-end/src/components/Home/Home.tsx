import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from "react-router-dom";
import ScrapperSvg from '../../assets/svg/scrap.svg';
import classes from './Home.module.css';


const Home: React.FunctionComponent = (): JSX.Element => {
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <img src={ScrapperSvg} alt="Logo" className={classes.image} />
                </Grid>
                <Grid item xs={8} sm={6}>
                    <Typography variant="h2" gutterBottom>ScrapThat!</Typography>
                    <Typography variant="h5" gutterBottom>Makes web scrapping easier than ever.</Typography>
                    <Link to="/scrap" className="no-link-decoration">
                        <Button variant="outlined" color="primary">Get Started</Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;