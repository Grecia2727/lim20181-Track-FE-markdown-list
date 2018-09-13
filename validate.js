#!/usr/bin/env node
const [, , ...args] = process.argv
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const linkCheck = require('link-check');

var markdownLinkExtractor = require('markdown-link-extractor');
const rutaURL = path.resolve(args[0]);
let arrlinksFoundOfMarkdown = [];
let linkOk = 0;
let cantLinks = 0;
let linkBroken = 0;
let linkUnique = 0;

// Imprimiendo links de archivo md:
// ================================================
module.exports = mdLinksValidate = (FileMarkdown2) => {
  const urlRegex = /\[(.*?)\]\((.*?|(https?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))\)/gi;
  let arrayUrl = urlRegex.exec(FileMarkdown2);

  do {
    for (let i = 1; i < (arrayUrl.length) / 2; i++) {
      arrlinksFoundOfMarkdown.push(
        {
          href: arrayUrl[i + 1],
          text: arrayUrl[i],
          file: rutaURL
        }
      );
      cantLinks = cantLinks + 1;
      i++;
    };
  } while ((arrayUrl = urlRegex.exec(FileMarkdown2)) !== null);
  // console.log('\n\x1b[31m%s\x1b[34m', 'Los links encontrados son: \n');
  // console.log(arrlinksFoundOfMarkdown);
  console.log("\n Total de links: " + cantLinks)
  return JSON.stringify(arrlinksFoundOfMarkdown);
}

//----------------------------------------------------------------
const validarStatus = (arrLinks) => {
  const arrayOfPromises = arrLinks.map(link => fetch(link))
  return Promise.all(arrayOfPromises)
    .then((response) => {
      const arrayOfObjects = arrLinks.map((link, i) => {
        const obj = {
          href: link.href,
          text: link.text,
          file: link.file,
          status: response[i].status,
          statusText: link.statusText,
        }

        if (response[i].status === 200) {
          obj.statusText = 'OK'
          linkOk++
        } else {
          obj.statusText = 'Fail'
          linkBroken++
        }
        console.log(obj)
      })
      console.log("\nTotal Links : " + arrLinks.length);
      console.log("Links OK: " + linkOk);
      console.log("Links Rotos: " + linkBroken);

    });
}
setTimeout(() => {
  validarStatus(arrlinksFoundOfMarkdown)
}, 5000);
