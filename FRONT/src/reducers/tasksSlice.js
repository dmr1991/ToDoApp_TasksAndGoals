import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to get tasks from backend
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await fetch("http://localhost:3001/getTasks", {
    headers: {
      Authorization: "dinamorales",
    },
  });
  const data = await res.json();
  return data; // tasks array
});

// Thunk to add task to the backend
export const postTask = createAsyncThunk("tasks/postTask", async (task) => {
  const res = await fetch("http://localhost:3001/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "dinamorales",
    },
    body: JSON.stringify(task),
  });
  const data = await res.json();
  return data.task; // task created
});

// Thunk to eliminate task from backend
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const res = await fetch(`http://localhost:3001/removeTask/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "dinamorales",
    },
  });
  if (!res.ok) throw new Error("Error deleting task");
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter((task) => task._id !== action.payload);
      });
  },
});
export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
