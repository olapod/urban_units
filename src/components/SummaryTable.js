import React from "react";
import { observer, inject } from 'mobx-react';
// import appStore from '../stores/appStore';
// import TableStore from '../stores/TableStore';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { red } from "@material-ui/core/colors";


const tableHeadStyles = theme => ({
   tableHead: {
    color: red,
  }
});


function createData(id, count, district) {
  return { id, count, district };
}

const columnData = [
  { id: 'id', numeric: 'true', disablePadding: false, label: 'Jednostka urbanistyczna' },
  { id: 'count', numeric: 'true', disablePadding: false, label: 'Liczba rekordów' },
  { id: 'district', numeric: 'false', disablePadding: false, label: 'Dzielnica' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => numeric => {
    this.props.onRequestSort(numeric, property);
  };

  render() {
    const { order, orderBy, classes} = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                // numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}

              >
                  <TableSortLabel
                    style={{ opacity: (orderBy === column.id) ? 1: 1 }}
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>

              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
EnhancedTableHead = withStyles(tableHeadStyles)(EnhancedTableHead);

const styles = theme => ({
  table: {
    maxWidth: 500,
  },
  cell: {
    padding: 0,
  },
  paper: {
    width: 550,
    paddingRight: 10
  },

});

@inject("tableStore", "appStore")
@observer

class SummaryTable extends React.Component {

  render() {
    const { classes } = this.props;
    let { order, orderBy, handleRequestSort, numeric, data } = this.props.tableStore;

    return (
      <TableContainer  className={classes.paper} component={Paper} >
        <div >
          <Table className={classes.table}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort.bind(this)}
              numeric={columnData.numeric}
            />
            <TableBody>
              {data
              .map(n => {
                return (
                  <TableRow
                    hover
                    key={n.id}
                  >
                    <TableCell  >{n.id}</TableCell>
                    <TableCell >{n.count}</TableCell>
                    <TableCell >{n.district}</TableCell>
                  </TableRow>
                );
              })}

            </TableBody>

          </Table>
        </div>
        </TableContainer>
    );
  }
}

export default withStyles(styles)(SummaryTable);