import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addPermissionWithActivity,
  updatePermissionWithActivity,
} from "../../features/permissionsSlice"; // Adjust the import paths
import { addActivity } from "../../features/activitySlice"; // Assuming you have an activity slice for logs

const PermissionForm = ({
  currentPermission,
  clearCurrentPermission,
  onSave,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentPermission) {
      setName(currentPermission.name);
      setDescription(currentPermission.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [currentPermission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Permission name is required");
      return;
    }

    const permissionData = {
      id: currentPermission?.id || Date.now(), // If editing, use currentPermission's ID, else generate a new ID
      name,
      description,
    };

    if (currentPermission) {
      // Update Permission with Activity
      dispatch(updatePermissionWithActivity(permissionData));
      // dispatch(
      //   addActivity({
      //     timestamp: new Date().toISOString(),
      //     message: `Permission "${name}" was updated.`,
      //   })
      // );
    } else {
      // Add Permission with Activity
      dispatch(addPermissionWithActivity(permissionData));
      // dispatch(
      //   addActivity({
      //     timestamp: new Date().toISOString(),
      //     message: `Permission "${name}" was added.`,
      //   })
      // );
    }

    // Reset form and clear current permission
    setName("");
    setDescription("");
    clearCurrentPermission(); // Call the function to clear the current permission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-md space-y-4"
    >
      <h2 className="text-xl font-bold">
        {currentPermission ? "Edit Permission" : "Add Permission"}
      </h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Permission Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter permission name"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="reset"
          className="btn btn-outline"
          onClick={() => {
            clearCurrentPermission();
            setName("");
            setDescription("");
          }}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {currentPermission ? "Update Permission" : "Add Permission"}
        </button>
      </div>
    </form>
  );
};

export default PermissionForm;
