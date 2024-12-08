import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserWithActivity, updateUser } from "../../features/usersSlice";

const UserForm = ({ currentUser, clearCurrentUser }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser) {
      // Update existing user
      dispatch(updateUser(formData)); // Dispatch updateUser action

      // Dispatch activity tracking only for updates
      dispatch({
        type: "addActivity",
        payload: {
          timestamp: new Date().toISOString(),
          message: `User "${formData.name}" was updated.`,
        },
      });
    } else {
      // Add new user with activity tracking
      dispatch(addUserWithActivity(formData));

      // Dispatch activity tracking for adding a new user
      dispatch({
        type: "addActivity",
        payload: {
          timestamp: new Date().toISOString(),
          message: `User "${formData.name}" was added.`,
        },
      });
    }

    setFormData({ name: "", email: "", status: "Active" });
    clearCurrentUser();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <select
        className="select select-bordered w-full"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
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
              setFormData({ name: "", email: "", status: "Active" });
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
