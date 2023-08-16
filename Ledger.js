import React from 'react';
import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Blockies from 'react-blockies';

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#dddddd",
    },
  },
}))(TableRow);

function Ledger() {
  //this.addInput("[network]",0)
  this.addInput("tx","object")
  this.addInput("add",-1)
  //this.addOutput("[network]",0)
  this.addOutput("balance()","function")

  this.balances = {}
  this.txns = []

  this.properties =  {
