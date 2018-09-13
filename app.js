#!/usr/bin/env node
const [, , ...args] = process.argv
// console.log(`hola mundo ${args}`)
console.log(args)
console.log("========")

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const rutaURL = path.resolve(args[0]);


//-------------------------------------------------------------------------------------------FUNCION VERIFICA SI ES UN DIRECTORIO O CARPETA
const checkIfFileOrFolder = paths => {
  const ext = '.md';
  const extName = path.extname(paths);
  fs.stat(paths, (error, stats) => {
    if (error) {
      console.log(error);
    }
    else {
      if (stats.isDirectory()) {
        fs.readdir(paths, 'utf8', (error, files) => {
          if (error) {
            console.log(error);
          } else {
            files.forEach(element => {
              checkIfFileOrFolder(paths + '/' + element);
            });

          }
        })
      } else if (stats.isFile() && ext===extName) {
        links = links.concat(readFileMarkdown(paths));

      }
    }
  });
}


// Lee la carpeta  =====================================
// const readCarpet = (leeCarpeta) => {
  // fs.readdir(rutaURL, (error, carpetas) => {
  //   console.log("rutaUrl: " + rutaURL);
  //   console.log(carpetas);
  //   fs.stat(rutaURL, (error, stats) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     else {
  //       if (stats.isDirectory()) {
  //         fs.readdir(path, 'utf8', (error, files) => {
  //           if (error) {
  //             console.log(error);
  //           } else {
  //             for (const fileName in files) {
  //               const element = files[fileName]
  //               readCarpet(path + '/' + element);
  //             }
  //           }
  //         })
  //       } else if (stats.isFile() && path.indexOf('.md', -3) >= 0) {
  //         links = links.concat(readFile(path));
  //         console.log(links)
  //       }
  //     }
  //   });
  // }


//Valida si es archivo MD en stats.js ==============================
const validateExtMDStats = (routeX) => {
  if (path.extname(routeX) === '.md') {
    console.log(routeX + ' Es archivo md');
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

//Valida si es archivo MD en Validate.js ==============================
const validateExtMDValidate = (routeX) => {
  if (path.extname(routeX) === '.md') {
    console.log(routeX + ' Es archivo md');
    readFileValidate(routeX)
  } else {
    console.log(args[0] + ' NO es un archivo md');
  }
}
//Lee archivo en Validate.js ===========================================
const readFileValidate = (routeX) => {
  const mdLinksValidate = require('./validate.js');
  const readFileDifferents = fs.readFileSync(routeX).toString();
  let links = mdLinksValidate(readFileDifferents);
}

//Valida si es archivo MD en index.js  ==============================
const validateExtMD = (routeX) => {
  if (path.extname(routeX) === '.md') {
    console.log(routeX + ' Es archivo md');
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
        readCarpet();

      } else if (stats.isFile()) {
        console.log(args[0] + " es un archivo");
        validateExtMD(args[0]);

      } else {
        console.log(args[0] + " no es archivo o carpeta");
      }
    }

  } else if (args[1] === '--validate') {
    console.log("Aquí validaremos cada link si está Ok o ROTO")
    validateExtMDValidate(args[0]);

  } else if (args[1] === '--stats') {
    console.log("Aquí validaremos la cantidad de Total de LINKS, UNICOS, y ROTOS")
    validateExtMDStats(args[0]);
  }
  else {
    console.log("el comando a ingresar debe ser: --validate o --stats")
    console.log("La forma correcta de ingresar los comandos son:")
    console.log("\n========================================")
    console.log("mdlinks <turuta> <--validate o --stats>")
    console.log("========================================")
  }
});
