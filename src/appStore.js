import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";
import rolesReducer from "./features/rolesSlice";
import permissionsReducer from "./features/permissionsSlice";
import activityReducer from "./features/activitySlice";

const appStore = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    activity: activityReducer,
  },
});

export default appStore;
