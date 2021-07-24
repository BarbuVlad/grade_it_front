/* in essence a string returned by a successfull login
has the format of a JsonWebToken*/
import {createSlice} from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "menu",
    initialState: [],
    reducers: {
        setMenu: (state, action) =>{return action.payload},
    }
});

//export actions one by one
export const {setMenu} = menuSlice.actions;
//export reducer as default
export default menuSlice.reducer; 
