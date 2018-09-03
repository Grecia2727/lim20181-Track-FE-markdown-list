#!/usr/bin/env node
const [, , ...args] = process.argv
const fs = require('fs');
const path = require('path');
const rutaURL = path.resolve(args[0]);

  
// Identificando e imprimiendo links de archivo md:
// ================================================
module.exports = mdLinks = (FileMarkdown) => {
  const urlRegex = /\[(.*?)\]\((.*?|(https?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))\)/gi;
  let arrayUrl = urlRegex.exec(FileMarkdown);
  console.log("esto es arrayUrl: " + arrayUrl);
  let linksFoundOfMarkdown = [];
  let arrlinksFoundOfMarkdown = [];
  let linkOk = 0;
  let cantLinks = 0;
  let linkBroken = 0;

  do {
    for (let i = 1; i < (arrayUrl.length) / 2; i++) {
      linksFoundOfMarkdown.push(
        {
          href: arrayUrl[i + 1],
          text: arrayUrl[i],
          file: rutaURL
        }
      );
      cantLinks = cantLinks + 1;
      i++;
    };
  } while ((arrayUrl = urlRegex.exec(FileMarkdown)) !== null);
  console.log('\n\x1b[31m%s\x1b[34m', 'Los links encontrados son: \n');
  console.log(linksFoundOfMarkdown);
  console.log("\n Total de links: " + cantLinks)
  return JSON.stringify(linksFoundOfMarkdown);
  
};
// ===========================================

