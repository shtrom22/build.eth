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
    title:"Ledger",
    currency: "SomeCoin",
    genesis:[
      {
        from: "0x0000000000000000000000000000000000000000",
        value: 1000,
        to: "0xc08b5542d177ac6686946920409741463a15dddb"
      }
    ]
  }
  this.size = [640, 360];


  for(let g in this.properties.genesis){
    this.processTx(this.properties.genesis[g],true)
  }

}

Ledger.prototype.processTx = function(tx,genesis) {
  console.log("process",tx)
  try{
    if(tx.to&&tx.from&&tx.value){
      if(!genesis || tx.from!="0x0000000000000000000000000000000000000000"){
        this.balances[tx.from] = this.balances[tx.from]?this.balances[tx.from]-tx.value:-tx.value
      }
      this.balances[tx.to] = this.balances[tx.to]?this.balances[tx.to]+tx.value:tx.value
      this.txns.push(tx)
    }
  }catch(e){console.log(e)}
}

Ledger.title = "Ledger";
Ledger.prototype.getTitle = function() {
  return this.properties.title;
