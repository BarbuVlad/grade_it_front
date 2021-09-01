/* in essence a string returned by a successfull login
has the format of a JsonWebToken*/
import {createSlice} from "@reduxjs/toolkit";

const jwtSlice = createSlice({
    name: "jwt",
    initialState: {id:null, token:''},
    reducers: {
        setJwt: (state, action) =>({...state, id:action.payload.id, token:action.payload.token}),
    }
});

//export actions one by one
export const {setJwt} = jwtSlice.actions;
//export reducer as default
export default jwtSlice.reducer; 
