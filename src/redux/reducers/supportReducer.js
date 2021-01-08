import { combineReducers } from 'redux';

const supportReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUPPORT':
            return action.payload
        default: 
            return state
    }
}

export default combineReducers({
    supportReducer,
})