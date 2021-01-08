import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* supportSaga(){
    // Use takeLatest with the login so that states don't get changed
    yield takeLatest('ADD_SUPPORT', addSupport);
};

function* addSupport(action) {
    // console.log('index post', action.payload);
    try {
        console.log(action.payload)
        yield axios.post('/api/support', action.payload)
        // yield put({ type: 'FETCH_ITEM' })
    } catch (error) {
        console.log('error with add support request', error);
    }
}//end addItem


export default supportSaga;