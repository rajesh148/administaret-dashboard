import { createSlice } from "@reduxjs/toolkit";
import { addActivity } from "./activitySlice";
import { v4 as uuidv4 } from "uuid"; // Add UUID package for unique IDs

const loadUsersFromLocalStorage = () => {
  const savedUsers = localStorage.getItem("users");
  return savedUsers ? JSON.parse(savedUsers) : [];
};

const initialState = {
  userList: loadUsersFromLocalStorage(),
  errorMessage: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      const { email, name, role, status, permissions, role_id } =
        action.payload;

      // Check if the email already exists in the user list
      const existingUser = state.userList.find((user) => user.email === email);

      if (existingUser) {
        // If the user already exists, set an error message
        state.errorMessage = "User with this email already exists";
      } else {
        // If the user doesn't exist, add the new user
        state.userList.push({
          email,
          name,
          role,
          status,
          permissions,
          role_id,
        });
        // Clear error message after successful addition
        state.errorMessage = "";
      }

      localStorage.setItem("users", JSON.stringify(state.userList));
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

    updateUserPermissions(state, action) {
      const existingUser = state.userList.find(
        (user) => user.role_id === action.payload.role_id
      );

      console.log("paylaod", action.payload);
      console.log("ex ", existingUser);
      if (existingUser) {
        // Update the permissions (or any other field) for the existing user
        existingUser.permissions = action.payload.permissions;

        // Ensure that the state is updated immutably
        state.userList = state.userList.map((user) =>
          user.role_id === action.payload.role_id
            ? { ...user, permissions: action.payload.permissions }
            : user
        );
      }

      localStorage.setItem("users", JSON.stringify(state.userList)); // Save updated list to localStorage
    },

    clearError(state, action) {
      state.errorMessage = null;

      localStorage.setItem("users", JSON.stringify(state.userList)); // Save updated list to localStorage
    },

    deleteUser(state, action) {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
      localStorage.setItem("users", JSON.stringify(state.userList)); // Save updated list to localStorage
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  updateUserPermissions,
  clearError,
} = usersSlice.actions;

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
