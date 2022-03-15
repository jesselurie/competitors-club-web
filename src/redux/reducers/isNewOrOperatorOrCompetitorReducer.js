import { createSlice, createAction } from '@reduxjs/toolkit'

/*
  In a game as Operator
    - Waiting for everyone to accept
    - Everyone accepted, create podium and submit results 
  In a game not as Operator 
   - Waiting for everyone to accept 
   - Waiting for operator to finish
  Not in a game 
   - Create a game 
  Being invited to a game  
   - View game 
  */
//IsNewOperatorOrCompetitor
// 0 -> NEW 
// 1 -> OPERATOR
// 2 -> COMPETITOR

export const setIsNewOrOperatorOrCompetitor = createAction('setIsNewOrOperatorOrCompetitor');

const isNewOrOperatorOrCompetitor = createSlice({
  name: 'isNewOrOperatorOrCompetitor',
  initialState: 0,
  extraReducers: (builder) => {
    builder.addCase(setIsNewOrOperatorOrCompetitor,(state,action)=>{
      return action.payload
    });
   
    builder.addDefaultCase((state, action) => {
      return state;
    });

  },
});

export const isNewOrOperatorOrCompetitorReducer =  isNewOrOperatorOrCompetitor.reducer;

