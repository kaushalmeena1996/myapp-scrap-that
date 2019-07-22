import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import classes from './About.module.css';

const About: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Typography variant="h4">ScrapThat!</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>v1.0</Typography>
        <Typography variant="body1">
          Web application for extracting data from other sites.
        </Typography>
      </Container>
    </div>
  );
}

export default About;