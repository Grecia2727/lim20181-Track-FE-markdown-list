# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

### Archivos del proyecto

- `README.md` con descripción del módulo, instrucciones de instalación, uso y
  documentación del API.
- `index.js`: Desde este archivo debes exportar una función (`mdLinks`).
- `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...)
- `.editorconfig` con configuración para editores de texto. Este archivo no se
  debe cambiar.
- `.eslintrc` con configuración para linter. Este archivo no
  se debe cambiar.
- `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
- `test/md-links.spec.js` debe contener los tests unitarios para la función
  `mdLinks()`tu inplementación debe pasar estos tets.

#### Valor de retorno

La función debe retornar un arreglo (`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Options

##### `Cuando la ruta corresponde a una carpeta`

La librería busca todos los links que hay en los archivos y subcarpetas de la ruta que hemos ingresado.

![validate](https://github.com/Grecia2727/lim20181-Track-FE-markdown-list/blob/master/img/index_carpeta.PNG)
<br>
##### `Cuando la ruta corresponde a un archivo MD`

Devuelve los links encontrados dentro del archivo MD.

![validate](https://github.com/Grecia2727/lim20181-Track-FE-markdown-list/blob/master/img/index_Archivo.PNG)
<br>
##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:
<br>
![validate](https://github.com/Grecia2727/lim20181-Track-FE-markdown-list/blob/master/img/validate.PNG)

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.
<br>
##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

![stats](https://github.com/Grecia2727/lim20181-Track-FE-markdown-list/blob/master/img/stats.PNG)
<br>
También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

![validate_stats](https://github.com/Grecia2727/lim20181-Track-FE-markdown-list/blob/master/img/validate_stats.PNG)
<br>
## Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con `require`
para usarlo programáticamente.


### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).

![md-links](https://github.com/Grecia2727/lim20181-Track-FE-markdown-list/blob/master/img/test1.PNG)
<br>
![md-links](https://github.com/Grecia2727/lim20181-Track-FE-markdown-list/blob/master/img/test2.PNG)
