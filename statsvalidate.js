#!/usr/bin/env node
const [, , ...args] = process.argv
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const rutaURL = path.resolve(args[0]);
let arrlinksFoundOfMarkdown = [];
let linkOk = 0;
let cantLinks = 0;
let linkBroken = 0;

// Imprimiendo links de archivo md:
// ================================================
module.exports = mdLinksStats = (FileMarkdown2) => {
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
      i++;
    };
  } while ((arrayUrl = urlRegex.exec(FileMarkdown2)) !== null);
  return arrlinksFoundOfMarkdown;
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

      console.log('\n\x1b[31m%s\x1b[34m', 'El Resultado es total de LINKS, UNICOS y ROTOS:')
      console.log("\nTotal Links : " + arrLinks.length);
      console.log("Links Rotos: " + linkBroken);
      console.log("Links Unicos: " + arrLinks.reduce((prev, item) => {
       if(prev.indexOf(item.href) === -1){
        return prev.concat(item.href);
       } 
       return prev;
      }, []).length);

    });
}

setTimeout(() => {
  validarStatus(arrlinksFoundOfMarkdown).then(result => {
  })
}, 5000);
