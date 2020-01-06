import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  paper: {

    padding: 20,
    fontSize: 32,
    margin: 40,
    textAlign: "center"
  },
});

export default function AppTitle() {
  const classes = useStyles();
  return <Paper variant="outlined" elevation={3} className={classes.paper}>Program do przypisywania jednostek urbanistycznych do punktów adresowych</Paper>;
}

