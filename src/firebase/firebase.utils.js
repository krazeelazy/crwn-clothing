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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; // if user signed out userAuth will be null, so we just want to return

    //if the userAuth obj. exists
    const userRef = firestore.doc(`users/${userAuth.uid}`); // get the user reference for this user based on id

    const snapShot = await userRef.get(); // get the snapshot to determine if there's data here (whether or not we've already stored this user object that has been authenticated)

    if (!snapShot.exists) { // check if the user exists, if not try to create a new user document
        const { displayName, email } = userAuth; // store the displayName and email
        const createdAt = new Date(); // current date and time
        try {
            await userRef.set({ // try to store the data in the database
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) { // console log any errors
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
        const collectionRef = firestore.collection(collectionKey);

        // batch write so it's all done at once, all or nothing, 
        // to pevent inconsistency if we were writing 1 at a time and the internet connection is lost 1/2 way through
        // makes code more predictable
        const batch = firestore.batch(); 
        objectsToAdd.forEach(obj => {
            const newDocRef = collectionRef.doc();// let firebase make a unique identifier (key)
            batch.set(newDocRef, obj);
        });

        return await batch.commit();
    };

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();
    
        return {
        routeName: encodeURI(title.toLowerCase()),//converts any chars a url can't read into something it can (eg space = %20)
        id: doc.id,
        title,
        items,
        };
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // always trigger Google pop up when use the google auth provider for authentication
export const signInWithGoogle = () => auth.signInWithPopup(provider);// set the provider to google

export default firebase; 