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
const provider = new firebase.auth.GoogleAuthProvider();
const sendButton = document.querySelector('#sendMessage')
const messageInput = document.querySelector('#message')
const messageContainer = document.querySelector('#messages')
const googleButton = document.querySelector('#loginWithGoogle')
const logOutButton = document.querySelector('#logOut')
const userInfoContainer = document.querySelector('#userInfo');
const buttonsContainer = document.querySelector('#buttons')
//Para mandarlo a firebase se manda a la base de datos

logOutButton.addEventListener('click', event => {
    event.preventDefault();
    if (confirm('Estás seguro de cerrar sesión?')) {
        firebase.auth().signOut()
            .then(function (result) {
                alert('Has salido de la sesión, hasta luego')
            }).catch(function (error) {
                alert('Ha habido un error')
            })
        
    }
})

googleButton.addEventListener('click', event => {
    event.preventDefault();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(result)
        }).catch(result => {
            console.log(error)
        })
})

sendButton.addEventListener('click', function (event) { //siempre el callback, lo que queremos que ocurra cuando sucede el evento
    event.preventDefault(); //callback se podría escribir como function(event){ event.preventDefault()}
    //console.log(messageInput.value) con .log vemos si funciona o no
    db.collection('mensajes').add({
        message: messageInput.value,
        timestamp: firebase.firestore.Timestamp.now()
    }).then(function () {
        alert('Mensaje guardado correctamente')
    }).catch(function (error) {
        console.log(error) //se imprime en consola
        alert('No se pudo guardar el mensaje')
    })
    messagesContainer.innerHTML = '';
})

//Se renderiza en el html

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userInfoContainer.innerHTML = `
                <p>${user.displayName}</p>
                <img src="${user.photoURL}" style= width:250px height:250px"/>
            `
            logOutButton.style.display = 'block'
            googleButton.remove();
            //googleButton.style.display='none'
            console.log('Está logeado', user)
            sendButton.disabled = false
        } else {
            console.log('No está logueado')
            userInfoContainer.innerHTML = ''
            buttonsContainer.appendChild(googleButton)
            logOutButton.style.display = 'none'
            sendButton.disabled = true
        }
    })
    db.collection('mensajes')
        .orderBy('timestamp')
        .onSnapshot(function (querySnapshot) { //MUESTRA LOS DATOS EN TIEMPO REAL
            const messages = [];
            querySnapshot.forEach(item => {
                messages.push(item.data())

            })
            let innerHtml = '<ul>' //Defino let para que cada mensaje nuevo sea visto
            messages.forEach(mensaje => {
                innerHtml += `
                <li>${mensaje.message} - ${mensaje.timestamp.toDate().toLocaleString()}</li>
            `
            }) //timestamp.toLocaleString() regresa una fecha formateada :) 
            innerHtml += '</ul>'
            messageContainer.innerHTML = innerHtml;
        })
});

