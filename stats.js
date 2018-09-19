#!/usr/bin/env node
const [, , ...args] = process.argv
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const rutaURL = path.resolve(args[0]);

let linkOk = 0;
let cantLinks = 0;
let linkBroken = 0;
let linkUnique = 0;

// Identificando e imprimiendo links de archivo md:
// ================================================
module.exports = mdLinksStats = (FileMarkdownValidate) => {
  let arrlinksFoundOfMarkdown = [];
  const urlRegex = /\[(.*?)\]\((.*?|(https?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))\)/gi;
  let arrayUrl = urlRegex.exec(FileMarkdownValidate);

  do {
    for (let i = 1; i < (arrayUrl.length) / 2; i++) {
      arrlinksFoundOfMarkdown.push(arrayUrl[i + 1]);
      cantLinks = cantLinks + 1;
      i++;
    };
  } while ((arrayUrl = urlRegex.exec(FileMarkdownValidate)) !== null);

  let unicos = new Set(arrlinksFoundOfMarkdown);
  console.log("los link unicos son: ");
  console.log(unicos);
  console.log("\nTotal de links: " + cantLinks)
  console.log("Links Uniques: ", unicos.size);
  console.log("Links Repetidos: " + (cantLinks - unicos.size));
  return JSON.stringify(arrlinksFoundOfMarkdown);
}
