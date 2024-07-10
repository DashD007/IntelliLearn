import { createSlice } from "@reduxjs/toolkit";

const researchSlice = createSlice({
    name:"research",
    initialState:{
        ResearchPapers:null,
        RelatedSearches:null
    },
    reducers:{
        setResearchPapers:(state,action)=>{
            state.ResearchPapers = action.payload;
        },
        setRelatedSearches:(state,action)=>{
            state.RelatedSearches = action.payload
        }
    }
})

export const {setResearchPapers, setRelatedSearches} = researchSlice.actions;
export default researchSlice.reducer