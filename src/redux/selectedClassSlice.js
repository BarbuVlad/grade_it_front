/* in essence a string returned by a successfull login
has the format of a JsonWebToken*/
import {createSlice} from "@reduxjs/toolkit";

const selectedClassSlice = createSlice({
    name: "selectedClass",
    initialState: {},
    reducers: {
        setObject: (state, action) =>{return action.payload},///< sets the entire object
    }
});

//export actions one by one
export const {setObject} = selectedClassSlice.actions;
//export reducer as default
export default selectedClassSlice.reducer; 
