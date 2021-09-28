import { takeEvery } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    yield console.log('I am fired');
}

export function* fetchCollectionsStart() {
    // creates a non-blocking call so the app can continue running other sagas or whatever the user wants to do. 
    // the rest of the system won't have to wait for this to get data back to continue.
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        );
}