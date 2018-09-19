const mdLinks = require('../index.js');
jest.setTimeout(30000);

describe('Verificar si es una funcion ', () => {

    const markdown = `
    ====== README ======
    
    ## Preámbulo
    [Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
    ligero muy popular entre developers. Es usado en muchísimas plataformas que
    herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
    
    Tópicos:
    - [Semver](https://semver.org/hhhhhhhhhhhhhhhhhhh)
    - [Path](https://nodejs.org/api/path.html)
    - [Path](https://nodejs.org/api/path.html)
    - [File System](https://nodejs.org/api/fs.html)
    - [marked](https://github.com/markedjs/marked)
    - [marked](https://github.com/markedjs/marked)
            `

    test('Validando que mdLinks es Funcion ', () => {
        expect(typeof mdLinks).toEqual('function');
    });

    test('El primer link deberia ser https://es.wikipedia.org/wiki/Markdown', () => {
        const linksFoundOfMarkdown = mdLinks(markdown)
        expect(linksFoundOfMarkdown[0].href).toBe('https://es.wikipedia.org/wiki/Markdown');
    }); 

    test('El cuarto link debería ser https://nodejs.org/api/path.html', () => {
        const linksFoundOfMarkdown = mdLinks(markdown)
        expect(linksFoundOfMarkdown[3].href).toBe('https://nodejs.org/api/path.html');
    }); 
  })
  