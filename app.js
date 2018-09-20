#!/usr/bin/env node
const [, , ...args] = process.argv
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const rutaURL = path.resolve(args[0]);
let linksOfDirectory = [];

//Valida si es un ARCHIVO o CARPETA (Realiza Recursividad) =============
const askFileOrDirectory = routeX => {
  const extension = '.md';
  const extName = path.extname(routeX);
  fs.stat(routeX, (error, stats) => {
    if (error) {
      console.log(error);
    }
    else {
      if (stats.isDirectory()) {
        fs.readdir(routeX, 'utf8', (error, files) => {
          if (error) {
            console.log(error);
          } else {
            files.forEach(element => {
              askFileOrDirectory(routeX + '/' + element);
            });

          }
        })
      }
      else if (stats.isFile() && extension === extName) {
        linksOfDirectory = linksOfDirectory.concat(readFileStats(routeX, './index.js'));
      }
    }
  });
}


//Valida si es archivo MD  ==========================================
const validateExtMD = (routeX, openFile) => {
  if (path.extname(routeX) === '.md') {
    readFileStats(routeX, openFile)
  } else {
    console.log(args[0] + ' NO es un archivo md');
  }
}
//Lee archivo ========================================================
const readFileStats = (routeX, openFile) => {
  const mdLinks = require(openFile);
  const readFileDifferents = fs.readFileSync(routeX).toString();
  let links = mdLinks(readFileDifferents);
}


// Funcion principal: lee carpeta y valida si es "Directorio" o "Archivo"
// ======================================================================
fs.stat(args[0], function (err, stats) {
  if (args[1] === undefined) {


    if (err) {
      console.log("Error");
      process.exit(1);
    }
    else {
      if (stats.isDirectory()) {
        console.log(args[0] + " es una carpeta");
        askFileOrDirectory(args[0]);

      } else if (stats.isFile()) {
        console.log(args[0] + " es un archivo");
        validateExtMD(args[0], './index.js');

      } else {
        console.log(args[0] + " no es archivo o carpeta");
      }
    }

  } else if (args[1] === '--validate' && args[2] === undefined) {
    console.log("--------------------------------------------------------")
    console.log("Aquí validaremos el STATUS de cada link: Si es OK o ROTO")
    console.log("--------------------------------------------------------")
    validateExtMD(args[0], './validate.js');

  } else if (args[1] === '--stats'  && args[2] === undefined) {
    console.log("--------------------------------------------------------")
    console.log("Aquí validaremos el Total de LINKS, y el total de ÚNICOS")
    console.log("--------------------------------------------------------")
    validateExtMD(args[0], './stats.js');

  } else if (args[1] === '--stats' && args[2] === '--validate') {
    console.log("---------------------------------------------------")
    console.log("Aquí validaremos el Total de LINKS, UNICOS, y ROTOS")
    console.log("---------------------------------------------------")
    validateExtMD(args[0], './statsvalidate.js');

  } else if (args[1] === '--validate' && args[2] === '--stats') {
    console.log("---------------------------------------------------")
    console.log("Aquí validaremos el Total de LINKS, UNICOS, y ROTOS")
    console.log("---------------------------------------------------")
    validateExtMD(args[0], './statsvalidate.js');

  } else {
    console.log("el comando a ingresar debe ser: --validate o --stats")
    console.log("La forma correcta de ingresar los comandos son:")
    console.log("\n========================================")
    console.log("mdlinks <turuta> <--validate o --stats>")
    console.log("========================================")
  }
});

