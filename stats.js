#!/usr/bin/env node
const [, , ...args] = process.argv
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const rutaURL = path.resolve(args[0]);


// Identificando e imprimiendo links de archivo md:
// ================================================
module.exports = mdLinksStats = (FileMarkdown2) => {
  const urlRegex = /\[(.*?)\]\((.*?|(https?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))\)/gi;
  let arrayUrl = urlRegex.exec(FileMarkdown2);
  console.log("esto es arrayUrl: " + arrayUrl);
  let linksFoundOfMarkdown = [];
  let arrlinksFoundOfMarkdown = [];
  let linkOk = 0;
  let cantLinks = 0;
  let linkBroken = 0;
  let linkUnique = 0;

  do {
    for (let i = 1; i < (arrayUrl.length) / 2; i++) {
      arrlinksFoundOfMarkdown.push(arrayUrl[i + 1],
      );
      cantLinks = cantLinks + 1;
      i++;
    };
  } while ((arrayUrl = urlRegex.exec(FileMarkdown2)) !== null);
  console.log('\n\x1b[31m%s\x1b[34m', 'Los links encontrados son: \n');
  console.log(arrlinksFoundOfMarkdown);
  console.log("\n Total de links: " + cantLinks)
  return JSON.stringify(arrlinksFoundOfMarkdown);


  // Valida si el link está ROTO o no lo está
  // ========================================
  let miErrorNoTanGlobal;
  const validarStatus = (arrLinks) => {
    const arrayOfPromises = arrLinks.map(link => fetch(link))

    return Promise.all(arrayOfPromises)
      .then((response) => {
        const arrayOfObjects = response.map((objRespuesta) => {
          const obj = {
            status: objRespuesta.status,
            statusText: objRespuesta.statusText
          };
          if (objRespuesta.status === 200) {
            obj.statusText = objRespuesta.statusText;
            linkUnique++;
          } else {
            obj.statusText = 'Fail';
            linkBroken++;
          }
          return obj;

        }).catch((error) => {
          console.error("Error > " + error);
          miErrorNoTanGlobal = error;
        });

          console.log(arrayOfObjects)
          console.log("links Rotos: " + linkBroken);
          console.log("links Unique: " + linkUnique);
        });
      }

validarStatus(arrlinksFoundOfMarkdown)
          .then((respuesta) => {
            console.log(restpuesta)
          });

  };
// ===========================================

