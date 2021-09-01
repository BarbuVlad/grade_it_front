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
import editTestSlice from "./editTestSlice";
import testIdToEditSlice from "./testIdToEditSlice";

import questionsCreatorSlice from './testCreator/questionsCreatorSlice';
import questionTextSlice from './testCreator/questionTextSlice';
import answersListSlice from './testCreator/answersListSlice';
import answersTypeSlice from './testCreator/answersTypeSlice';

const reducer = combineReducers({
    jwt: jwtSlice,
    editTest:editTestSlice,
    testIdToEdit:testIdToEditSlice,

    questionsCreator: questionsCreatorSlice,
    questionText: questionTextSlice,
    answersList: answersListSlice,
    answersType: answersTypeSlice

});


const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk:false })]
});

export default store;