import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { StyleSheet, css } from "aphrodite";

const About: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={css(styles.container)}>
      <Container maxWidth="xl">
        <Typography variant="h4">ScrapThat!</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          v1.0
        </Typography>
        <Typography variant="body1">
          Web application for extracting data from other sites.
        </Typography>
      </Container>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 64
  }
});

export default About;
