import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRole,
  addRoleWithActivity,
  updateRole,
  updateRoleWithActivity,
} from "../../features/rolesSlice";

const RoleForm = ({ currentRole, setCurrentRole }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const allPermissions = ["Read", "Write", "Delete"]; // Example permissions

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRole) {
      setRoleName(currentRole.name);
      setPermissions(currentRole.permissions);
    } else {
      setRoleName("");
      setPermissions([]);
    }
  }, [currentRole]);

  const handlePermissionChange = (permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((perm) => perm !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      alert("Role name is required");
      return;
    }

    const roleData = {
      id: currentRole ? currentRole.id : Date.now(),
      name: roleName,
      permissions,
      selected: false,
    };

    if (currentRole) {
      // dispatch(updateRole(roleData));
      dispatch(updateRoleWithActivity(roleData)); // Update role with activity
    } else {
      // dispatch(addRole(roleData));
      dispatch(addRoleWithActivity(roleData)); // Add role with activity
    }

    setCurrentRole(null);
    setRoleName("");
    setPermissions([]);
  };

  const handleCancel = () => {
    setCurrentRole(null);
    setRoleName("");
    setPermissions([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-md space-y-4"
    >
      <h2 className="text-xl font-bold">
        {currentRole ? "Edit Role" : "Add Role"}
      </h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Role Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Enter role name"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Permissions</span>
        </label>
        <div className="flex gap-4">
          {allPermissions.map((permission) => (
            <label
              key={permission}
              className="cursor-pointer flex items-center space-x-2"
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={permissions.includes(permission)}
                onChange={() => handlePermissionChange(permission)}
              />
              <span className="text-black">{permission}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {currentRole ? "Update Role" : "Add Role"}
        </button>
      </div>
    </form>
  );
};

export default RoleForm;