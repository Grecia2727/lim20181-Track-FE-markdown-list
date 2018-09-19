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
        linksOfDirectory = linksOfDirectory.concat(readFile(routeX));
      }
    }
  });
}


//Valida si es archivo MD en statsvalidate.js =====================
const validateExtMDStatsValidate = (routeX) => {
  if (path.extname(routeX) === '.md') {
    readFileStatsValidate(routeX) 
  } else {
    console.log(args[0] + ' NO es un archivo md');
  }
}    
//Lee archivo en statsvalidate.js ==================================
const readFileStatsValidate = (routeX) => {
  const mdLinksStats = require('./statsvalidate.js');
  const readFileDifferents = fs.readFileSync(routeX).toString();
  let links = mdLinksStats(readFileDifferents);
}

//Valida si es archivo MD en stats.js ==============================
const validateExtMDStats = (routeX) => {
  if (path.extname(routeX) === '.md') {
    readFileStats(routeX)
  } else {
    console.log(args[0] + ' NO es un archivo md');
  }
}
//Lee archivo en stats.js ===========================================
const readFileStats = (routeX) => {
  const mdLinksStats = require('./stats.js');
  const readFileDifferents = fs.readFileSync(routeX).toString();
  let links = mdLinksStats(readFileDifferents);
}

//Valida si es archivo MD en Validate.js =============================
const validateExtMDValidate = (routeX) => {
  if (path.extname(routeX) === '.md') {
    readFileValidate(routeX)
  } else {
    console.log(args[0] + ' NO es un archivo md');
  }
}
//Lee archivo en Validate.js ========================================
const readFileValidate = (routeX) => {
  const mdLinksValidate = require('./validate.js');
  const readFileDifferents = fs.readFileSync(routeX).toString();
  let links = mdLinksValidate(readFileDifferents);
}

//Valida si es archivo MD en index.js  ==============================
const validateExtMD = (routeX) => {
  if (path.extname(routeX) === '.md') {
    readFile(routeX);
  } else {
    console.log(routeX + ' NO es un archivo md');
  }
}
//Lee archivo en index.js ===========================================
const readFile = (routeX) => {
  const mdLinks = require('./index.js');
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
        validateExtMD(args[0]);

      } else {
        console.log(args[0] + " no es archivo o carpeta");
      }
    }

  } else if (args[1] === '--validate' && args[2] === undefined) {
    console.log("--------------------------------------------------------")
    console.log("Aquí validaremos el STATUS de cada link: Si es OK o ROTO")
    console.log("--------------------------------------------------------")
    validateExtMDValidate(args[0]);

  } else if (args[1] === '--stats'  && args[2] === undefined) {
    console.log("--------------------------------------------------------")
    console.log("Aquí validaremos el Total de LINKS, y el total de ÚNICOS")
    console.log("--------------------------------------------------------")
    validateExtMDStats(args[0]);

  } else if (args[1] === '--stats' && args[2] === '--validate') {
    console.log("---------------------------------------------------")
    console.log("Aquí validaremos el Total de LINKS, UNICOS, y ROTOS")
    console.log("---------------------------------------------------")
    validateExtMDStatsValidate(args[0]);

  } else if (args[1] === '--validate' && args[2] === '--stats') {
    console.log("---------------------------------------------------")
    console.log("Aquí validaremos el Total de LINKS, UNICOS, y ROTOS")
    console.log("---------------------------------------------------")
    validateExtMDStatsValidate(args[0]);

  } else {
    console.log("el comando a ingresar debe ser: --validate o --stats")
    console.log("La forma correcta de ingresar los comandos son:")
    console.log("\n========================================")
    console.log("mdlinks <turuta> <--validate o --stats>")
    console.log("========================================")
  }
});

