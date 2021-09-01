/*A slimple string to specify the type of answers for a question
*/
import {createSlice} from "@reduxjs/toolkit";

const answersTypeSlice = createSlice({
    name: "answersTypeSlice",
    initialState: "radiobuttons",
    reducers: {
        changeAnswersType: (state, action) =>{return action.payload},
        //can be: radiobuttons, checkboxes, text

    }
});

//export actions one by one
export const {changeAnswersType} = answersTypeSlice.actions;
//export reducer as default
export default answersTypeSlice.reducer; 
