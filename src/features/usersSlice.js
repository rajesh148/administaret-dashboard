import { createSlice } from "@reduxjs/toolkit";
import { addActivity } from "./activitySlice";
import { v4 as uuidv4 } from "uuid"; // Add UUID package for unique IDs

const loadUsersFromLocalStorage = () => {
  const savedUsers = localStorage.getItem("users");
  return savedUsers ? JSON.parse(savedUsers) : [];
};

const initialState = {
  userList: loadUsersFromLocalStorage(),
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      const userWithId = { ...action.payload, id: uuidv4() }; // Add unique ID
      state.userList.push(userWithId);
      localStorage.setItem("users", JSON.stringify(state.userList)); // Save updated list to localStorage
    },
    updateUser(state, action) {
      const index = state.userList.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.userList[index] = action.payload;
        localStorage.setItem("users", JSON.stringify(state.userList)); // Save updated list to localStorage
      }
    },

    deleteUser(state, action) {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
      localStorage.setItem("users", JSON.stringify(state.userList)); // Save updated list to localStorage
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export const addUserWithActivity = (user) => (dispatch) => {
  dispatch(addUser(user));
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `User "${user.name}" was added.`,
    })
  );
};

export const deleteUserWithActivity = (id, name) => (dispatch) => {
  dispatch(deleteUser(id)); // Only delete the user by their ID
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `User "${name}" was deleted.`,
    })
  );
};

export default usersSlice.reducer;
