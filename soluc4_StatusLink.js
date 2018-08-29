#!/usr/bin/env node

let linkBroken = 0;
let linkOk = 0

// ====================================================
// devuelve y cuenta, si el link es VALIDO o está ROTO
// ====================================================

'use strict';
const linkCheck = require('link-check');
linkCheck('http://facebook.com', { headers: { 'Authorization': 'Basic Zm9vOmJhcg==' } }, function (err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`${result.link} is ${result.status}`);

if (result.status === 'dead') {
  linkBroken++
}
else if (result.status === 'alive'){
  linkOk++
}
else {
   console.log('ni dead ni live, es error')
}
return console.log("los rotos son " + linkBroken + " y los link OK son " + linkOk);
});

// fuente: https://github.com/tcort/link-check