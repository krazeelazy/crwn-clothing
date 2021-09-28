import { takeLatest, call, put } from 'redux-saga/effects';

import {
    firestore,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    try{
        yield console.log('I am fired');
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // call is the effect that involves the convertCollectionsSnapshotMap method
        // same as doing const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // but call allows us to yield and defer control to the middleware
        const collectionsMap = yield call( 
            convertCollectionsSnapshotToMap,
            snapshot
        );
        // put is the saga effect for creating actions
        // like dispatch but can be yielded
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    // creates a non-blocking call so the app can continue running other sagas or whatever the user wants to do. 
    // the rest of the system won't have to wait for this to get data back to continue.
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        );
}