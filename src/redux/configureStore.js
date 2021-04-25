/*
This store represents the top-level redux store, 
containing global states needed in most components.
States used:
    - JWT
        --token: needed for authorization when calling (most of) REST API end-points.
        --user_id: necessary for most REST API functions

Takes in all slices to further provide them to the general app  */



import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import jwtSlice from "./jwtSlice";

const reducer = combineReducers({
    jwt: jwtSlice,

});


const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk:false })]
});

export default store;