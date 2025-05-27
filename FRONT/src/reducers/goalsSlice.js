import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to get goals from backend
export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  const res = await fetch("http://localhost:3001/getGoals", {
    headers: {
      Authorization: "dinamorales",
    },
  });
  const data = await res.json();
  return data; // goals array
});

// Thunk to add task to backend
export const postGoal = createAsyncThunk("goals/postGoal", async (goal) => {
  const res = await fetch("http://localhost:3001/addGoal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "dinamorales",
    },
    body: JSON.stringify(goal),
  });
  const data = await res.json();
  return data.goal; // created goal
});

// Thunk to eliminate goal in backend
export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (id) => {
  const res = await fetch(`http://localhost:3001/removeGoal/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "dinamorales",
    },
  });
  if (!res.ok) throw new Error("Error deleting goal");
  return id;
});

const goalsSlice = createSlice({
  name: "goals",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(postGoal.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        return state.filter((goal) => goal._id !== action.payload);
      });
  },
});
export const { addGoal, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
