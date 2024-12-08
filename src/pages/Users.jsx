import React, { useState } from "react";
import UserForm from "../components/user/UserForm";
import UserList from "../components/user/UserList";

const Users = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleEditUser = (user) => {
    setCurrentUser(user);
  };

  const clearCurrentUser = () => {
    setCurrentUser(null);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      <UserForm currentUser={currentUser} clearCurrentUser={clearCurrentUser} />
      <UserList onEdit={handleEditUser} />
    </div>
  );
};

export default Users;
