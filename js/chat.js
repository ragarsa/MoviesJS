// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmm5x16xFJKWq9MIQTVvSYvTGU2edEVV4",
    authDomain: "webdevcoursechatactosoft.firebaseapp.com",
    databaseURL: "https://webdevcoursechatactosofat.firebaseio.com",
    projectId: "webdevcoursechatactosoft",
    storageBucket: "webdevcoursechatactosoft.appspot.com",
    messagingSenderId: "612864844168",
    appId: "1:612864844168:web:2c54d49692636b0b9a5a3d",
    measurementId: "G-GVFH9RM1CR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); //Base de datos de firestore, se guarda la referencia a la base de datos
const sendButton = document.querySelector('#sendMessage')
const messageInput = document.querySelector('#message')
const messageContainer = document.querySelector('#messages')
//Para mandarlo a firebase se manda a la base de datos

sendButton.addEventListener('click', function(event) { //siempre el callback, lo que queremos que ocurra cuando sucede el evento
    event.preventDefault(); //callback se podría escribir como function(event){ event.preventDefault()}
    //console.log(messageInput.value) con .log vemos si funciona o no
    db.collection('mensajes').add({
        message: messageInput.value
    }).then(function(){
        alert('Mensaje guardado correctamente')
    }).catch(function(error){
        console.log(error) //se imprime en consola
        alert('No se pudo guardar el mensaje')
    })
    messagesContainer.innerHTML = '';
})

//Se renderiza en el html

document.addEventListener('DOMContentLoaded', () => {
    db.collection('mensajes').onSnapshot(function(querySnapshot) { //MUESTRA LOS DATOS EN TIEMPO REAL
        const messages = [];
        querySnapshot.forEach(item => {
            messages.push(item.data())
        })
        let innerHtml = '<ul>' //Defino let para que cada mensaje nuevo sea visto
        messages.forEach(message => {
            innerHtml += `
                <li>${message.message} </li>
            `
        })
        innerHtml += '</ul>'
        messageContainer.innerHTML += innerHtml;
    }) 
});