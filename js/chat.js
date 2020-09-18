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
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const sendButton = document.querySelector('#sendMessage')
const messageInput = document.querySelector('#message')
const messageContainer = document.querySelector('#messages')
const googleButton = document.querySelector('#loginWithGoogle')
const logOutButton = document.querySelector('#logOut')
const userInfoContainer = document.querySelector('#userInfo');
const buttonsContainer = document.querySelector('#buttons')
const imageInput = document.querySelector('#imageInput')

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

function uploadStorage(file, docId){
    return new Promise(function(resolve, reject){
        const imageRef = storage.ref(`chat/images/${docId}.${file.type.split('/')[1]}`)
        imageRef.put(file)
            .then(function(){
                imageRef.getDownloadURL()
                    .then(function(url){
                        resolve(url)
                    })
            })
    })      
    let url = '';
    
    imageRef.put(file) //sirve para subir el file
        .then(snapShot =>{
            console.log(snapShot)
            snapShot.ref.getDownloadURL()
                .then(url =>{
                    //console.log(url)
                    imageUrl = url
                })
                .catch(error =>{
                    console.log(error)
                })
        })
        .catch (error =>{
            console.log(error)
        })
        return imageUrl
}

sendButton.addEventListener('click', function (event) { //siempre el callback, lo que queremos que ocurra cuando sucede el evento
    event.preventDefault(); //callback se podría escribir como function(event){ event.preventDefault()}
    const image = imageInput.files[0]
    //const imageUrl = uploadStorage(image, 'testote')

    //console.log(messageInput.value) //console.log vemos si funciona o no
    
    db.collection('mensajes').add({
        message: messageInput.value,
        timestamp: firebase.firestore.Timestamp.now()
    }).then(function (docRef) { //referencia del documento que se acaba de crear en firebase
        //alert('Mensaje guardado correctamente')
        uploadStorage(image, docRef.id)
            .then(function(url){
                db.collection('mensajes').doc(docRef.id).update({
                    image : url
            })
        
        }).then (() =>{
            console.log('funciona')
        }).catch((error)=>
        {
            console.log('NO FUNCIONA')
        })
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


