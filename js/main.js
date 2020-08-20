/* PRIMERO SE CREAN REFERENCIAS DESDE EL DOM
    DE ESTA MANERA JS TIENE BIEN UBICADO EL OBJETO DESDE EL DOM
    Y PUEDA SER MANIPULADO
*/
//Forma antigua
//const listMoviesSection = document.getElementById('movies-list')/* se guarda la referencia de la seccipón del 
//elemento section en este caso por medio de un id */


const mockData = [
    {
        title: 'La forma del agua',
        duration: '140 min',
        director: 'Guillermo del Toro',
        gender: 'Ciencia Ficción',
        country: 'México',
        sinopsis: ' LA FORMA DEL AGUA, un sobrenatural cuento de hadas que, con el telón de fondo de la Guerra Fría, transcurre en Norteamérica alrededor del año 1962. En el oculto laboratorio gubernamental de alta seguridad donde trabaja, la solitaria Elisa (Sally Hawkins) se halla atrapada en una vida regida por el aislamiento. La vida de Elisa cambia para siempre cuando, junto con su compañera Zelda (Octavia Spencer), descubre un experimento clasificado como secreto. El reparto se completa con los actores Michael Shannon, Richard Jenkins, Doug Jones y Michael Stuhlbarg.',
        isAvailable: true
    },
    {
        title: 'La lista de Schindler',
        duration: '194 min',
        director: 'Steven Spielbergs',
        gender: 'Historia',
        country: 'Alemania-Francia-USA',
        sinopsis: 'Oskar Schindler (Liam Neeson), un empresario alemán de gran talento para las relaciones públicas, busca ganarse la simpatía de los nazis de cara a su beneficio personal. Después de la invasión de Polonia por los alemanes en 1939, Schindler consigue, gracias a sus relaciones con los altos jerarcas nazis, la propiedad de una fábrica de Cracovia.',
        isAvailable: false
    },
    {
        title: 'El resplandor de una mente sin recuerdos',
        duration: '125 min',
        director: 'Stanley Kubrick',
        gender: 'Thriller',
        country: 'USA',
        sinopsis:'',
        isAvailable: true
    },
    {
        title: 'Gremlins',
        duration: '180',
        director: 'Joe Dante',
        gender: 'Comedy',
        country: 'USA',
        sinopsis:'',
        isAvailable: false

    },
]
//Callback--funcion para que se ejecute despues de que el DOM se haya cargado
//Solo imprime la data

const listMoviesSection = document.querySelector('#movies-list')

const getMovies = () => {
    let moviesHtml = '';
    mockData.forEach(movie => { //Recibe un objeto llamado movie, ocn backstick concatenamos de una manera más afectiva la información
        if(!movie.sinopsis){
            movie.sinopsis = 'Sinopsis no disponible'
        }
        const html = `
        <article>
            <h4>${movie.title}</h4>
            <p>Duración: ${movie.duration}</p>
            <p>Director: ${movie.director}</p>
            <p>Género: ${movie.gender}</p>
            <p>País: ${movie.country}</p>
            <p> Sinopsis: ${movie.sinopsis} </p>
            <p> Disponible: ${movie.isAvailable ? 'SI':'NO'} </p>
        </article>
        `
        //moviesHtml.push(html) si const html = []
        moviesHtml += html;

    })//EL valor de las etiquetas va a ser dinámico
    listMoviesSection.innerHTML += moviesHtml// += se deja todo la información Dentro de la referencia vas a inyectar el html
}
/*El siguiente paso es crear un desencadenador (evento) para que se renderice */

document.addEventListener('DOMContentLoaded', getMovies()) //Observador cuando se cargue el contenido, 


//los elementos del DOM
//VALIDACIONES
const nameInput = document.querySelector('#name-input')
const directorInput = document.querySelector('#director-input')
//const genderInput = document.querySelector('#gender-input')
const countryInput = document.querySelector('#country-input');
const sinopsisInput = document.querySelector('#sinopsis-input');
const errorsList = document.querySelector('#errors')

const errors = { //objeto
    'name.lengthInvalid': {isActive: false, message: 'El nombre debe ser de al menos 4 letras'},
    'name.capitalLetter': {isActive:false, message: 'El nombre debe incluir la primera letra mayúscula'}, 
    'director.lengthInvalid': {isActive: false, message: 'El nombre del director debe ser de al menos 4 letras'},
    'director.capitalLetter': {isActive:false, message: 'El nombre del director debe incluir la primera letra mayúscula'},
    'country.lengthInvalid': {isActive: false, message: 'El nombre del país debe ser de al menos 4 letras'},
    'country.capitalLetter': {isActive:false, message: 'El nombre del país debe incluir la primera letra mayúscula'},
    'sinopsis.lengthMaxInvalid': {isActive: false, message: 'La sinopsis no debe superar los 140 carácteres'},
    'sinopsis.lengthInvalid': {isActive: false, message: 'La sinopsis debe ser de al menos 10 letras'},
    'sinopsis.capitalLetter': {isActive:false, message: 'La primera letra de la sinopsis debe ser mayúscula'}


}

const printErrors = () => {
    errorsList.innerHTML = '';
    //Object.keys(errors) = ['name.lengthInvalid', 'name.capitalLetter'] 
    // Si error = name.lengthIvalid, entonces errors[error] = errors.'name.lengthInvalid' = {IsActive: false, message: 'El nombre debe ser al menos 4 letras'}
    //iterar sobre objetos con el ForEach
    Object.keys(errors).forEach(error =>{
        if (errors[error].isActive){
            errorsList.innerHTML += `<li>${errors[error].message}</li>` //Concatenando se conserva lo que ya está en el html
        }
    })
}
//Otras variables con las condiciones para validar texto
const isLengthInvalid = (value) => value.length < 4;
const isCapitalLetter = (value) => value && value[0] !== value[0].toUpperCase();
const isLengthMaxInvalid = (value) => value.length > 140;  
const isSinopsisLengthInvalid = (value) => value.length < 10;

nameInput.addEventListener('input', (event) => {
    const textValue = event.target.value;
    
    if (isLengthInvalid(textValue)){
        errors['name.lengthInvalid'].isActive = true
    } else {
        errors['name.lengthInvalid'].isActive = false
    }

    if (isCapitalLetter(textValue)){
        errors['name.capitalLetter'].isActive = true
    } else {
        errors['name.capitalLetter'].isActive = false
    }
    printErrors();

}) //Observador para el input en específico


directorInput.addEventListener('input', (event) => {
    const textValue = event.target.value;
    
    if (isLengthInvalid(textValue)){
        errors['director.lengthInvalid'].isActive = true
    } else {
        errors['director.lengthInvalid'].isActive = false
    }

    if (isCapitalLetter(textValue)){
        errors['director.capitalLetter'].isActive = true
    } else {
        errors['director.capitalLetter'].isActive = false
    }
    printErrors();
});

countryInput.addEventListener('input', (event) => {
    const textValue = event.target.value;
    
    if (isLengthInvalid(textValue)){
        errors['country.lengthInvalid'].isActive = true
    } else {
        errors['country.lengthInvalid'].isActive = false
    }

    if (isCapitalLetter(textValue)){
        errors['country.capitalLetter'].isActive = true
    } else {
        errors['country.capitalLetter'].isActive = false
    }
    printErrors();
});

sinopsisInput.addEventListener('input', (event) => {
    const textValue = event.target.value;
    
    if (isSinopsisLengthInvalid(textValue)){
        errors['sinopsis.lengthInvalid'].isActive = true
    } else {
        errors['sinopsis.lengthInvalid'].isActive = false
    }

    if (isCapitalLetter(textValue)){
        errors['sinopsis.capitalLetter'].isActive = true
    } else {
        errors['sinopsis.capitalLetter'].isActive = false
    }
    if (isLengthMaxInvalid(textValue)){
        errors['sinopsis.lengthMaxInvalid'].isActive = true;
    } else {
        errors['sinopsis.lengthMaxInvalid'].isActive = false;
    }
    printErrors();
});