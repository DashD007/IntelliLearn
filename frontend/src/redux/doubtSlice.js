import {createSlice} from "@reduxjs/toolkit";

const doubtSlice = createSlice({
    name:"doubt",
    initialState:{
        allDoubts:null,
        doubtTree:[]
    },
    reducers:{
        setdoubtTree:(state,action) => {
            state.doubtTree = action.payload;
        },
        setallDoubts:(state,action)=>{
            state.allDoubts = action.payload;
        },
        addDoubt:(state,action) => {
            state.allDoubts.unshift(action.payload)
        },
    },
})

export const {setallDoubts,addDoubt, setdoubtTree} = doubtSlice.actions;
export default doubtSlice.reducer;