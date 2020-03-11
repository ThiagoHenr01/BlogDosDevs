import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {

    apiKey: "AIzaSyD1nDyJzkd4_8luuXu6xSADEbH1oYWkuk0",
    authDomain: "reactapp-e4b6a.firebaseapp.com",
    databaseURL: "https://reactapp-e4b6a.firebaseio.com",
    projectId: "reactapp-e4b6a",
    storageBucket: "reactapp-e4b6a.appspot.com",
    messagingSenderId: "313559674627",
    appId: "1:313559674627:web:f7778341bd70a18eaf8336",
    measurementId: "G-JYVQN6Y3RK"

};

class Firebase {

    constructor() {

        // Initialize Firebase
        app.initializeApp(firebaseConfig);

        // Referenciando a database para acessar em outros locais 
        this.app = app.database();

        this.storage = app.storage();

    };

    login(email, password) {

        return app.auth().signInWithEmailAndPassword(email, password);

    };

    logout() {

        return app.auth().signOut();

    };

    async register(nome, email, password) {

        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({

            nome: nome

        });

    };

    isInitializae() {

        return new Promise(resolve => {

            app.auth().onAuthStateChanged(resolve);

        });

    };

    getCurrent() {

        return app.auth().currentUser && app.auth().currentUser.email;

    };

    getCurrentUid() {

        return app.auth().currentUser && app.auth().currentUser.uid;

    };

    async getUserName(callback) {

        if(!app.auth().currentUser) {

            return null;

        };

        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid).once('value').then(callback);

    };

};

export default new Firebase();