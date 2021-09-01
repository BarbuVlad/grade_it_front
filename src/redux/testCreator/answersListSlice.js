/* A question has a list of answers
*/
import {createSlice} from "@reduxjs/toolkit";

const answersListSlice = createSlice({
    name: "answersListSlice",
    initialState: [],
    reducers: {
        addAnswer: (state, action) =>{
            //console.log("ADD answer--", action.payload);
            return [...state, action.payload]
        },
        removeAnswer: (state, action) =>{
            let ans_arr_pop = [...state];
            ans_arr_pop.pop();
            return ans_arr_pop;
        },//remove at index payload
        setAnswerText: (state, action) =>{
            let ans_arr_text = [...state];
            const txt = ans_arr_text[action.payload.id].text;
            ans_arr_text[action.payload.id] = {...ans_arr_text[action.payload.id], text:action.payload.text};
            return ans_arr_text;
        },
        setAnswerCorect: (state, action) =>{
            let ans_arr_corect = [...state];
            ans_arr_corect[action.payload.id] = { ...ans_arr_corect[action.payload.id] , corect:action.payload.bool};
            return ans_arr_corect;
        },
        resetAnswers: (state) =>{return []},
        setAnswers: (state, action) => { return action.payload }

    }
});

//export actions one by one
export const {addAnswer, removeAnswer, setAnswerText,setAnswerCorect,resetAnswers, setAnswers} = answersListSlice.actions;
//export reducer as default
export default answersListSlice.reducer; 
