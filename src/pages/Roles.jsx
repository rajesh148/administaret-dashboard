import React, { useState } from "react";
import RoleForm from "../components/role/RoleForm";
import RoleList from "../components/role/RoleList";

const Roles = () => {
  const [currentRole, setCurrentRole] = useState(null);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Role Management</h1>
      <RoleForm currentRole={currentRole} setCurrentRole={setCurrentRole} />
      <RoleList onEdit={(role) => setCurrentRole(role)} />
    </div>
  );
};

export default Roles;
