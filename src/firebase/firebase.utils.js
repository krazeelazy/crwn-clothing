import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // for database
import 'firebase/compat/auth'; // for authentication

const config = {
    apiKey: "AIzaSyBOZIkLk7psq4GNkQvW6f9lpMU1GNca1mU",
    authDomain: "crown-db-3d1ff.firebaseapp.com",
    projectId: "crown-db-3d1ff",
    storageBucket: "crown-db-3d1ff.appspot.com",
    messagingSenderId: "101299807012",
    appId: "1:101299807012:web:b8013560ecfd30f31a49b1"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // always trigger Google pop up when use the google auth provider for authentication
export const signInWithGoogle = () => auth.signInWithPopup(provider);// set the provider to google

export default firebase; 