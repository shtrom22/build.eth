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
};


Ledger.prototype.onExecute = function() {
  this.setOutputData(0,{
    name:"balance",
    args:[{name:"address",type:"string"}],
    function:(args)=>{
      console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args)
      return this.balances[args.address]
    }
  })
}

Ledger.prototype.onAction = function() {
  let tx = this.getInputData(0)
  console.log("INPUT 0 is",tx)
  this.processTx(tx,false)
}

const topPadding = 50
const rowStyle = {fontSize:20,letterSpacing:-1}

Ledger.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{

    const itemStyle = {padding:5,borderBottom:"1px solid #969cca"}

    let rows = []

    for(let t in this.txns){
      let tx = this.txns[t]
      rows.push(
        <StyledTableRow>
          <TableCell style={rowStyle}>
            <Blockies
              seed={tx.from.toLowerCase()}
              size={8}
              scale={2}

            /><span style={{marginLeft:4}}>{tx.from.substr(0,8)}</span>
          </TableCell>
          <TableCell style={rowStyle}>
            {parseFloat(tx.value).toFixed(2)}
          </TableCell>
          <TableCell style={rowStyle}>
          <Blockies
            seed={tx.to.toLowerCase()}
            size={8}
            scale={2}

          /><span style={{marginLeft:4}}>{tx.to.substr(0,8)}</span>
          </TableCell>
        </StyledTableRow>
