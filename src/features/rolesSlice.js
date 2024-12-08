import { createSlice } from "@reduxjs/toolkit";
import { addActivity } from "./activitySlice";

// Helper function to load data from localStorage
const loadRolesFromLocalStorage = () => {
  const savedRoles = localStorage.getItem("roles");
  return savedRoles
    ? JSON.parse(savedRoles)
    : [{ id: "1", name: "Admin", permissions: ["read", "write"] }];
};

// Helper function to save data to localStorage
const saveRolesToLocalStorage = (roles) => {
  localStorage.setItem("roles", JSON.stringify(roles));
};

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roleList: loadRolesFromLocalStorage(),
    errorMessage: "",
  },
  reducers: {
    addRole(state, action) {
      console.log("acti", action);
      if (action.payload.permissions.length <= 0) {
        state.errorMessage = "Please check atleast one check box";
        return;
      }
      state.roleList.push(action.payload);
      saveRolesToLocalStorage(state.roleList);
    },
    updateRole(state, action) {
      const index = state.roleList.findIndex(
        (role) => role.id === action.payload.id
      );
      if (index !== -1) {
        state.roleList[index] = action.payload;
        saveRolesToLocalStorage(state.roleList);
      }
    },
    deleteRole(state, action) {
      state.roleList = state.roleList.filter(
        (role) => role.id !== action.payload
      );
      saveRolesToLocalStorage(state.roleList);
    },

    clearError(state, action) {
      state.errorMessage = null;
      saveRolesToLocalStorage(state.roleList);
    },
  },
});

export const {
  addRole,
  updateRole,
  deleteRole,
  toggleRoleSelection,
  clearError,
} = rolesSlice.actions;

// Add Role with Activity
export const addRoleWithActivity = (role) => (dispatch) => {
  dispatch(addRole(role));
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `Role "${role.name}" was added.`,
    })
  );
};

// Delete Role with Activity
export const deleteRoleWithActivity = (id, name) => (dispatch) => {
  dispatch(deleteRole(id));
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `Role "${name}" was deleted.`,
    })
  );
};

// Update Role with Activity
export const updateRoleWithActivity = (role) => (dispatch) => {
  dispatch(updateRole(role));
  dispatch(
    addActivity({
      timestamp: new Date().toISOString(),
      message: `Role "${role.name}" was updated.`,
    })
  );
};

export default rolesSlice.reducer;
