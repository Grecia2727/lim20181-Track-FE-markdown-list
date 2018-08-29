#!/usr/bin/env node
const [, , ...args] = process.argv
// console.log(`hola mundo ${args}`)
console.log(args)
console.log("========")

const fs = require('fs');
const path = require('path');
const rutaURL = path.resolve(args[0]);


// Lee la carpeta  =====================================
const readCarpet = (leeCarpeta) => {
  fs.readdir(rutaURL, (error, carpetas) => {
    console.log(rutaURL);
    console.log(carpetas);
    // for (let i = 0; i < carpetas.length; i++) {
      // const newRoute = path.resolve(args[0]+"\""+ carpetas[i]);
      // const newRoute = path.join(args[0], carpetas[i]);
    // }
  });
}

//Valida si es archivo MD ==============================
const validateExtMD = () => {
  if (path.extname(args[0]) === '.md') {
    console.log(args[0] + ' Es archivo md');

    const mdLinks = require('./index.js');
    const readFileDifferents = fs.readFileSync(args[0]).toString();
    let links = mdLinks(readFileDifferents);
  } else {
    console.log(args[0] + ' NO es un archivo md');
  }
}

//Valida si es archivo MD ==============================
const validateExtMD2 = () => {
  if (path.extname(args[0]) === '.md') {
    console.log(args[0] + ' Es archivo md');

    const mdLinksStats = require('./stats.js');
    const readFileDifferentsStats = fs.readFileSync(args[0]).toString();
    let links = mdLinksStats(readFileDifferentsStats);
  } else {
    console.log(args[0] + ' NO es un archivo md');
  }
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
        readCarpet();

      } else if (stats.isFile()) {
        console.log(args[0] + " es un archivo");
        validateExtMD();

      } else {
        console.log(args[0] + " no es archivo o carpeta");
      }
    }

  } else if (args[1] === '--validate') {
    validateExtMD2();
    console.log("Aquí validaremos cada link si está Ok o ROTO")

  } else if (args[1] === '--stats') {
    console.log("Aquí validaremos la cantidad de Total de LINKS, UNICOS, y ROTOS")
  }
  else  {
    console.log("el comando a ingresar debe ser: --validate o --stats")
    console.log("La forma correcta de ingresar los comandos son:")
    console.log("\n========================================")
    console.log("mdlinks <turuta> <--validate o --stats>")
    console.log("========================================")
  }
});

