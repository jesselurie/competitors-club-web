import { createSlice, createAction } from '@reduxjs/toolkit'


export const setCurrentGameVieId = createAction('setCurrentGameVieId');

const currentGameVieId = createSlice({
  name: 'currentGameVieId',
  initialState:"0x00000000000000000000000000000000",
  extraReducers: (builder) => {
    builder.addCase(setCurrentGameVieId,(state,action)=>{
      return action.payload
    });
   
    builder.addDefaultCase((state, action) => {
      return state;
    });

  },
});

export const currentGameVieIdReducer =  currentGameVieId.reducer;

