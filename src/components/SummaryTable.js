import React from "react";
import { observer, inject } from 'mobx-react';
import AppStore from '../stores/AppStore';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  table: {
    maxWidth: 500,
  },
  cell: {
    padding: 6,
  },
  paper: {
    width: 550,
  }
});


function createData(unit, records) {
  return { unit, records, district };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

@inject("AppStore")
@observer

class SummaryTable extends React.Component {

  render() {
  let { summary } = this.props.AppStore;

  return (
    <TableContainer  className={this.props.classes.paper} component={Paper} >
      <Table className={this.props.classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={this.props.classes.cell} align="center">Jednostka urbanistyczna
              {/* <TableSortLabel
                  active={props.sortBy === "bID"}
                  direction={props.sortOrder}
                  onClick={props.requestSort("bID")}
                > */}

              {/* </TableSortLabel> */}
            </TableCell>
            <TableCell className={this.props.classes.cell} align="center">Liczba rekordów
              {/* <TableSortLabel
                  active={props.sortBy === "bcount"}
                  direction={props.sortOrder}
                  onClick={props.requestSort("bcount")}
                > */}

              {/* </TableSortLabel> */}
            </TableCell>
            <TableCell className={this.props.classes.cell} align="center">Nazwa osiedla
              {/* <TableSortLabel
                  active={props.sortBy === "bcount"}
                  direction={props.sortOrder}
                  onClick={props.requestSort("bcount")}
                >

              </TableSortLabel> */}
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {summary.map(row => (
            <TableRow key={row.id}>
              <TableCell className={this.props.classes.cell} align="center">{row.id}</TableCell>
              <TableCell className={this.props.classes.cell} align="center">{row.count}</TableCell>
              <TableCell className={this.props.classes.cell} align="center">{row.district}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
          }
}

export default withStyles(styles)(SummaryTable);