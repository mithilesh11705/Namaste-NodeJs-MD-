/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnection:(state,action)=>{
            return action.payload;
        },
        removeConnections:(state,action)=>{
            return null;
        }
    },
});

export const {addConnection,removeConnections}=connectionSlice.actions;
export default connectionSlice.reducer;