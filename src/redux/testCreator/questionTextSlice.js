/*A slimple string to specify the question
*/
import {createSlice} from "@reduxjs/toolkit";

const questionTextSlice = createSlice({
    name: "questionTextSlice",
    initialState: "",
    reducers: {
        changeQuestionText: (state, action) =>{return action.payload},
        resetQuestionText: (state) =>{return ""},//remove at index payload

    }
});

//export actions one by one
export const {changeQuestionText, resetQuestionText} = questionTextSlice.actions;
//export reducer as default
export default questionTextSlice.reducer; 
