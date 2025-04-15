import { createSlice } from '@reduxjs/toolkit';

const requestSlice=createSlice({
    name:'request',
    initialState:null,
    reducers:{
        addRequest:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
            const newState=state.filter((request)=>request._id!==action.payload._id);
            return newState;
        }
    },
});

export const  {addRequest,removeRequest}=requestSlice.actions;
export default requestSlice.reducer;
