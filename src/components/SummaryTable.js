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
  { id: 'id',
  // numeric: 'true',
   disablePadding: false, label: 'Jednostka urbanistyczna' },
  { id: 'count',
  // numeric: 'true',
   disablePadding: false, label: 'Liczba rekordów' },
  { id: 'district',
  // numeric: 'false',
   disablePadding: false, label: 'Dzielnica' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
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

@inject("AppStore")
@observer

class SummaryTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    let { summary } = this.props.AppStore;
    this.state = {
      order: 'asc',
      orderBy: 'id',
      data: summary.sort((a, b) => (a.id < b.id ? -1 : 1)),
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
        // ? this.state.data.sort((a, b) => b[orderBy].localeCompare(a[orderBy]))
        // : this.state.data.sort((a, b) => ab[orderBy].localeCompare(b[orderBy]))
    this.setState({ data, order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy,} = this.state;
    return (
      <TableContainer  className={classes.paper} component={Paper} >
        <div >
          <Table className={classes.table}>
            <EnhancedTableHead

              order={order}
              orderBy={orderBy}

              onRequestSort={this.handleRequestSort}

            />
            <TableBody>
              {data

              .map(n => {

                return (
                  <TableRow
                    hover
                    // onClick={event => this.handleClick(event, n.id)}

                    // tabIndex={-1}
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

// class SummaryTable extends React.Component {

//   render() {
//   let { summary } = this.props.AppStore;

//   return (
//     <TableContainer  className={this.props.classes.paper} component={Paper} >
//       <Table className={this.props.classes.table} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell className={this.props.classes.cell} align="center">Jednostka urbanistyczna
//               {/* <TableSortLabel
//                   active={props.sortBy === "bID"}
//                   direction={props.sortOrder}
//                   onClick={props.requestSort("bID")}
//                 > */}

//               {/* </TableSortLabel> */}
//             </TableCell>
//             <TableCell className={this.props.classes.cell} align="center">Liczba rekordów
//               {/* <TableSortLabel
//                   active={props.sortBy === "bcount"}
//                   direction={props.sortOrder}
//                   onClick={props.requestSort("bcount")}
//                 > */}

//               {/* </TableSortLabel> */}
//             </TableCell>
//             <TableCell className={this.props.classes.cell} align="center">Nazwa osiedla
//               {/* <TableSortLabel
//                   active={props.sortBy === "bcount"}
//                   direction={props.sortOrder}
//                   onClick={props.requestSort("bcount")}
//                 >

//               </TableSortLabel> */}
//             </TableCell>

//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {summary.map(row => (
//             <TableRow key={row.id}>
//               <TableCell className={this.props.classes.cell} align="center">{row.id}</TableCell>
//               <TableCell className={this.props.classes.cell} align="center">{row.count}</TableCell>
//               <TableCell className={this.props.classes.cell} align="center">{row.district}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
//           }
// }

export default withStyles(styles)(SummaryTable);