/* in essence a string returned by a successfull login
has the format of a JsonWebToken*/
import {createSlice} from "@reduxjs/toolkit";

const editTestSlice = createSlice({
    name: "editTest",
    initialState: false,
    reducers: {
        setEditTest: (state, action) =>{return action.payload},///< sets the entire object
    }
});

//export actions one by one
export const {setEditTest} = editTestSlice.actions;
//export reducer as default
export default editTestSlice.reducer; 
