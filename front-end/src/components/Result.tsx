import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import IResult from "../types/result";

export interface IResultProps {
  resultIndex: number;
  result: IResult;
  deleteResult: (resultIndex: number) => void;
}

const Result: React.FunctionComponent<IResultProps> = (
  props: IResultProps
): JSX.Element => {
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handlePageChange(event: unknown, page: number) {
    setPage(page);
  }

  function handleRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <Paper
      className={css(styles.container)}
      key={`result-${props.resultIndex}`}
    >
      <Box p={1}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Box px={1}>
              <Typography variant="h6" color="inherit">
                {props.result.url}
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <IconButton
              onClick={handleExpandClick}
              aria-label="View-Button"
              title="View result."
              color="primary"
            >
              {expanded ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            <IconButton
              onClick={() => props.deleteResult(props.resultIndex)}
              aria-label="Delete-Button"
              title="Delete result."
              color="secondary"
            >
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Collapse in={expanded} timeout="auto">
        <Table className={css(styles.table)}>
          <TableHead>
            <TableRow>
              {props.result.fields.map((header, hIndex) => (
                <TableCell key={`result-${props.resultIndex}-header-${hIndex}`}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.result.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rIndex) => (
                <TableRow key={`result-${props.resultIndex}-row-${rIndex}`}>
                  {row.map((cell, cIndex) => (
                    <TableCell
                      key={`result-${props.resultIndex}-row-${rIndex}-cell-${cIndex}`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={props.result.data.length}
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
        />
      </Collapse>
    </Paper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 16,
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

export default Result;
