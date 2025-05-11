import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const goalsSlice = createSlice({
  name: 'goals',
  initialState, 
  reducers: {
    addGoal: (state, action) => {
      state.push(action.payload);
    },
    removeGoal: (state, action) => {
      return state.filter(goal => goal.id !== action.payload);
    }
  }
});

export const { addGoal, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
