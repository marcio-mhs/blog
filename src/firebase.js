import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyB_nBUnQ0vj91hbB71VmeBpI5PPm7U5Iu0",
    authDomain: "reactapp-bb79f.firebaseapp.com",
    databaseURL: "https://reactapp-bb79f-default-rtdb.firebaseio.com",
    projectId: "reactapp-bb79f",
    storageBucket: "reactapp-bb79f.appspot.com",
    messagingSenderId: "578201414826",
    appId: "1:578201414826:web:e3b85dc3ecc0c663d8b4d3"
};

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);
        this.app = app.database();
    }

    login(email, senha){
        return app.auth().signInWithEmailAndPassword(email, senha)
    }

    async register(nome, email, senha){
        await app.auth().createUserWithEmailAndPassword(email, senha);
        const uid = app.auth().currentUser.uid;
        return app.database().ref('usuarios').child(uid).set({nome: nome});
    }

    isInitialized(){
        return new Promise(resolve=>{
            app.auth().onAuthStateChanged(resolve);
        });
    }

    getCurrentUser(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
            .once('value')
            .then(callback);
    }

}

export default new Firebase();