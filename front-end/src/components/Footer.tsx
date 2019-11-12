import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const Footer: React.FunctionComponent = (): JSX.Element => {
  return (
    <footer className={css(styles.container)}>
      <Container maxWidth="sm">
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Copyright © 2019 ScrapThat!
        </Typography>
      </Container>
    </footer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12
  }
});

export default Footer;
