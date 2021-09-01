/* in essence a string returned by a successfull login
has the format of a JsonWebToken*/
import {createSlice} from "@reduxjs/toolkit";

const testIdToEditSlice = createSlice({
    name: "testIdToEdit",
    initialState: null,
    reducers: {
        setTestId: (state, action) =>{return action.payload},///< sets the entire object
    }
});

//export actions one by one
export const {setTestId} = testIdToEditSlice.actions;
//export reducer as default
export default testIdToEditSlice.reducer; 
