#!/usr/bin/env node
const [, , ...args] = process.argv
const fs = require('fs');
const path = require('path');

// Identificando e imprimiendo links de archivo md:
// ================================================
module.exports = mdLinks = (FileMarkdownValidate) => {
  let arrlinksFoundOfMarkdown = [];
  const urlRegex = /\[(.*?)\]\((.*?|(https?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))\)/gi;
  let arrayUrl = urlRegex.exec(FileMarkdownValidate);

  do {
    for (let i = 1; i < (arrayUrl.length) / 2; i++) {
      arrlinksFoundOfMarkdown.push(arrayUrl[i + 1]);
      i++;
    };
  } while ((arrayUrl = urlRegex.exec(FileMarkdownValidate)) !== null);

  let unicos = new Set(arrlinksFoundOfMarkdown);
  console.log("los link unicos son: ");
  console.log(unicos);
  console.log('\n\x1b[31m%s\x1b[34m', 'El Resultado es:')
  console.log("\nTotal de links: " + arrlinksFoundOfMarkdown.length)
  console.log("Links Uniques: ", unicos.size);
  console.log("Links Repetidos: " + (arrlinksFoundOfMarkdown.length - unicos.size));
  return JSON.stringify(arrlinksFoundOfMarkdown);
}
