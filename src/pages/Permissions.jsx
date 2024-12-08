import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PermissionList from "../components/permission/PermissionList";
import PermissionForm from "../components/permission/PermissionForm";
import { updatePermission, addPermission } from "../features/permissionsSlice"; // Import addPermission if needed
import { addActivity } from "../features/activitySlice"; // Assuming you have an activity slice for logs

const Permissions = () => {
  const [currentPermission, setCurrentPermission] = useState(null);
  const dispatch = useDispatch();

  const handleEdit = (permission) => {
    setCurrentPermission(permission);
  };

  const handleSave = (permission) => {
    if (currentPermission) {
      // Update Permission with Activity
      dispatch(updatePermission(permission)); // Updating the permission
      dispatch(
        addActivity({
          timestamp: new Date().toISOString(),
          message: `Permission "${permission.name}" was updated.`,
        })
      );
    } else {
      // Add Permission with Activity
      dispatch(addPermission(permission)); // Adding the permission
      dispatch(
        addActivity({
          timestamp: new Date().toISOString(),
          message: `Permission "${permission.name}" was added.`,
        })
      );
    }

    // Reset the form after saving
    setCurrentPermission(null);
  };

  const clearCurrentPermission = () => {
    setCurrentPermission(null);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Permission Management</h1>
      <PermissionForm
        currentPermission={currentPermission}
        clearCurrentPermission={clearCurrentPermission}
        onSave={handleSave}
      />
      <PermissionList onEdit={handleEdit} />
    </div>
  );
};

export default Permissions;
