import { createSlice } from "@reduxjs/toolkit";
import { addActivity } from "./activitySlice";

// Load permissions from localStorage if available
const loadPermissionsFromLocalStorage = () => {
  const storedPermissions = localStorage.getItem("permissions");
  return storedPermissions ? JSON.parse(storedPermissions) : [];
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    permissionList: loadPermissionsFromLocalStorage(), // Load permissions on startup
  },
  reducers: {
    deletePermission(state, action) {
      console.log(state);
      const filteredState = state.permissionList.filter(
        (permission) => permission.id !== action.payload.id
      );
      localStorage.setItem("permissions", JSON.stringify(filteredState)); // Persist data after deletion
      state.permissionList = filteredState;
    },

    addPermission: (state, action) => {
      state.permissionList.push(action.payload);
      localStorage.setItem("permissions", JSON.stringify(state.permissionList)); // Persist data after adding
    },

    updatePermission: (state, action) => {
      const index = state.permissionList.findIndex(
        (perm) => perm.id === action.payload.id
      );
      if (index !== -1) {
        state.permissionList[index] = action.payload;
        localStorage.setItem(
          "permissions",
          JSON.stringify(state.permissionList)
        ); // Persist data after updating
      }
    },
  },
});

export const { deletePermission, addPermission, updatePermission } =
  permissionsSlice.actions;

// Add Permission with Activity
export const addPermissionWithActivity = (permission) => (dispatch) => {
  dispatch(addPermission(permission));
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `Permission "${permission.name}" was added.`,
    })
  );
};

// Delete Permission with Activity
export const deletePermissionWithActivity = (id, name) => (dispatch) => {
  dispatch(deletePermission(id));
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `Permission "${name}" was deleted.`,
    })
  );
};

// Update Permission with Activity
export const updatePermissionWithActivity = (permission) => (dispatch) => {
  dispatch(updatePermission(permission));
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `Permission "${permission.name}" was updated.`,
    })
  );
};

export default permissionsSlice.reducer;
