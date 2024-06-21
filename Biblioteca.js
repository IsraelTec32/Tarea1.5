const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Clase base Libro
class Libro {
    constructor(isbn, titulo, autor, disponibilidad, tipo) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.disponibilidad = disponibilidad;
        this.tipo = tipo; // Nuevo atributo para el tipo de libro
    }

    static cargarBiblioteca() {
        const contenido = fs.readFileSync('biblioteca.txt', 'utf-8');
        const lineas = contenido.split('\n');
        const libros = lineas.map(linea => {
            const [isbn, titulo, autor, disponibilidad, tipo] = linea.split('|');
            switch (tipo) {
                case 'Academico':
                    return new TituloAcademico(isbn, titulo, autor, disponibilidad, tipo);
                case 'Ficcion':
                    return new TituloFiccion(isbn, titulo, autor, disponibilidad, tipo);
                case 'Tecnico':
                    return new TituloTecnico(isbn, titulo, autor, disponibilidad, tipo);
                default:
                    return new Libro(isbn, titulo, autor, disponibilidad, tipo);
            }
        });
        return libros;
    }

    static guardarBiblioteca(libros) {
        const lineas = libros.map(libro => `${libro.isbn}|${libro.titulo}|${libro.autor}|${libro.disponibilidad}|${libro.tipo}`).join('\n');
        fs.writeFileSync('biblioteca.txt', lineas);
    }
}

// Subclase para Título Académico
class TituloAcademico extends Libro {
    constructor(isbn, titulo, autor, disponibilidad, campo) {
        super(isbn, titulo, autor, disponibilidad, 'Academico');
        this.campo = campo;
    }
}

// Subclase para Título de Ficción
class TituloFiccion extends Libro {
    constructor(isbn, titulo, autor, disponibilidad, genero) {
        super(isbn, titulo, autor, disponibilidad, 'Ficcion');
        this.genero = genero;
    }
}

// Subclase para Título Técnico
class TituloTecnico extends Libro {
    constructor(isbn, titulo, autor, disponibilidad, area) {
        super(isbn, titulo, autor, disponibilidad, 'Tecnico');
        this.area = area;
    }
}

// Función para mostrar el menú
function mostrarMenu() {
    console.log('Bienvenido a la biblioteca');
    console.log('1. Consultar libros');
    console.log('2. Agregar libro');
    console.log('3. Borrar libro');
    console.log('4. Salir');
}

// Función para mostrar todos los libros de un tipo específico
function mostrarLibrosTipo(tipo) {
    const libros = Libro.cargarBiblioteca().filter(libro => libro.tipo === tipo);
    console.log(`Lista de libros de tipo ${tipo}:`);
    libros.forEach(libro => {
        console.log(`${libro.titulo} - ${libro.autor} (${libro.disponibilidad})`);
    });
}

// Función para mostrar el submenú de consulta de libros
function mostrarSubMenuConsultar() {
    console.log('Tipos de libros disponibles:');
    console.log('1. Académico');
    console.log('2. Ficción');
    console.log('3. Técnico');
}

// Función para consultar libros
function consultarLibros() {
    mostrarSubMenuConsultar(); // Mostrar el submenú de tipos de libros
    rl.question('Selecciona el tipo de libro a consultar: ', opcion => {
        switch (opcion) {
            case '1':
                mostrarLibrosTipo('Academico');
                rl.question('Introduce el título del libro académico: ', titulo => {
                    leerContenidoLibro(titulo, 'Academico');
                    regresarAlMenu();
                });
                break;
            case '2':
                mostrarLibrosTipo('Ficcion');
                rl.question('Introduce el título del libro de ficción: ', titulo => {
                    leerContenidoLibro(titulo, 'Ficcion');
                    regresarAlMenu();
                });
                break;
            case '3':
                mostrarLibrosTipo('Tecnico');
                rl.question('Introduce el título del libro técnico: ', titulo => {
                    leerContenidoLibro(titulo, 'Tecnico');
                    regresarAlMenu();
                });
                break;
            default:
                console.log('Opción inválida.');
                regresarAlMenu();
        }
    });
}

// Función para agregar libro
function agregarLibro() {
    rl.question('¿Qué tipo de libro quieres agregar?\n1. Título Académico\n2. Título de Ficción\n3. Título Técnico\nSeleccione una opción: ', tipo => {
        switch (tipo) {
            case '1':
                agregarTituloAcademico();
                break;
            case '2':
                agregarTituloFiccion();
                break;
            case '3':
                agregarTituloTecnico();
                break;
            default:
                console.log('Opción inválida.');
                regresarAlMenu();
        }
    });
}

// Función para agregar Título Académico
function agregarTituloAcademico() {
    rl.question('Introduce el título del libro: ', titulo => {
        rl.question('Introduce el autor del libro: ', autor => {
            rl.question('Introduce el campo del conocimiento: ', campo => {
                const isbn = Math.floor(Math.random() * 1000000000).toString(); // Genera un ISBN aleatorio
                const disponibilidad = 'Disponible';
                const nuevoLibro = new TituloAcademico(isbn, titulo, autor, disponibilidad, campo);
                const libros = Libro.cargarBiblioteca();
                libros.push(nuevoLibro);
                Libro.guardarBiblioteca(libros);
                console.log('Libro agregado exitosamente.');
                regresarAlMenu();
            });
        });
    });
}

// Función para agregar Título de Ficción
function agregarTituloFiccion() {
    rl.question('Introduce el título del libro: ', titulo => {
        rl.question('Introduce el autor del libro: ', autor => {
            rl.question('Introduce el género del libro: ', genero => {
                const isbn = Math.floor(Math.random() * 1000000000).toString(); // Genera un ISBN aleatorio
                const disponibilidad = 'Disponible';
                const nuevoLibro = new TituloFiccion(isbn, titulo, autor, disponibilidad, genero);
                const libros = Libro.cargarBiblioteca();
                libros.push(nuevoLibro);
                Libro.guardarBiblioteca(libros);
                console.log('Libro agregado exitosamente.');
                regresarAlMenu();
            });
        });
    });
}

// Función para agregar Título Técnico
function agregarTituloTecnico() {
    rl.question('Introduce el título del libro: ', titulo => {
        rl.question('Introduce el autor del libro: ', autor => {
            rl.question('Introduce el área técnica del libro: ', area => {
                const isbn = Math.floor(Math.random() * 1000000000).toString(); // Genera un ISBN aleatorio
                const disponibilidad = 'Disponible';
                const nuevoLibro = new TituloTecnico(isbn, titulo, autor, disponibilidad, area);
                const libros = Libro.cargarBiblioteca();
                libros.push(nuevoLibro);
                Libro.guardarBiblioteca(libros);
                console.log('Libro agregado exitosamente.');
                regresarAlMenu();
            });
        });
    });
}

// Función para borrar libro
function borrarLibro() {
    rl.question('Introduce el título del libro a borrar: ', titulo => {
        let libros = Libro.cargarBiblioteca();
        libros = libros.filter(libro => libro.titulo.toLowerCase() !== titulo.toLowerCase());
        Libro.guardarBiblioteca(libros);
        console.log('Libro borrado exitosamente.');
        regresarAlMenu();
    });
}

// Función para leer el contenido de un libro desde un archivo de texto
function leerContenidoLibro(titulo, tipo) {
    try {
        const contenido = fs.readFileSync(`${titulo}.txt`, 'utf-8');
        console.log(`Contenido de ${titulo} (${tipo}):`);
        console.log(contenido);
    } catch (error) {
        console.log(`Error al leer el contenido de ${titulo}.`);
    }
}

// Función para regresar al menú principal
function regresarAlMenu() {
    mostrarMenu();
    rl.question('Selecciona una opción: ', opcion => {
        switch (opcion) {
            case '1':
                consultarLibros();
                break;
            case '2':
                agregarLibro();
                break;
            case '3':
                borrarLibro();
                break;
            case '4':
                console.log('Saliendo...');
                rl.close();
                break;
            default:
                console.log('Opción inválida.');
                regresarAlMenu();
        }
    });
}

// Función principal
function main() {
    regresarAlMenu();
}

// Ejecutar la función principal
main();

