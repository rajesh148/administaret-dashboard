import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearError, updateUser } from "../../features/usersSlice";

const UserForm = ({ currentUser, clearCurrentUser }) => {
  const dispatch = useDispatch();

  // Fetch roleList from Redux store
  const roles = useSelector((state) => state.roles.roleList);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
    role: roles.length > 0 ? roles[0].name : "", // Default to the first role if available
    permissions: roles.length > 0 ? roles[0].permissions : [],
    role_id: roles.length > 0 ? roles[0].id : "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(updateUser(formData));

      dispatch({
        type: "addActivity",
        payload: {
          timestamp: new Date().toISOString(),
          message: `User "${formData.name}" was updated with role "${formData.role}".`,
        },
      });
    } else {
      console.log("Form data ", formData);
      dispatch(addUser(formData));
    }
    setFormData({
      name: "",
      email: "",
      status: "Active",
      role: roles.length > 0 ? roles[0].name : "",
      permissions: roles.length > 0 ? roles[0].permissions : [],
      role_id: roles.length > 0 ? roles[0].name : "",
    });
    clearCurrentUser();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-1/2 mx-auto">
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full"
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
          dispatch(clearError());
        }}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          dispatch(clearError());
        }}
        required
      />

      <select
        className="select select-bordered w-full"
        value={formData.role}
        onChange={(e) => {
          const selectedRole = roles.find(
            (role) => role.name === e.target.value
          );
          setFormData({
            ...formData,
            role: selectedRole.name,
            permissions: selectedRole.permissions,
            role_id: selectedRole.id,
          });

          dispatch(clearError());
        }}
        required
      >
        {roles.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>

      {currentUser && (
        <select
          className="select select-bordered w-full"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      )}
      <div className="flex justify-between">
        <button type="submit" className="btn btn-primary">
          {currentUser ? "Update User" : "Add User"}
        </button>
        {currentUser && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              clearCurrentUser();
              setFormData({
                name: "",
                email: "",
                status: "Active",
                role: roles.length > 0 ? roles[0] : "",
                permissions: roles.length > 0 ? roles[0].permissions : "",
                role_id: roles.length > 0 ? roles[0].id : "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
