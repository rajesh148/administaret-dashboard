import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRoleSelection,
  deleteRole,
  deleteRoleWithActivity,
} from "../../features/rolesSlice";
import { addActivity } from "../../features/activitySlice";

const RoleList = ({ onEdit }) => {
  const roles = useSelector((state) => state.roles.roleList);
  const dispatch = useDispatch();

  console.log(roles);

  const handleCheckboxChange = (id) => {
    dispatch(toggleRoleSelection(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Roles</h2>
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="border border-gray-300 px-4 py-2 text-black">
              Select
            </th> */}
            <th className="border border-gray-300 px-4 py-2 text-black">
              Role Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Permissions
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50">
              {/* <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={role.selected}
                  onChange={() => handleCheckboxChange(role.id)}
                />
              </td> */}
              <td className="border border-gray-300 px-4 py-2 text-black">
                {role.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-black">
                {role.permissions.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="btn btn-primary btn-sm mr-2"
                  // onClick={() => onEdit(role)}
                  onClick={() => {
                    onEdit(role);
                    dispatch(
                      addActivity({
                        timestamp: new Date().toISOString(),
                        message: `Editing role "${role.name}".`,
                      })
                    );
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  // onClick={() => dispatch(deleteRole(role.id))}
                  onClick={() => {
                    dispatch(deleteRoleWithActivity(role.id, role.name));
                    // dispatch(deleteRole(role.id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {roles.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="text-center text-gray-500 px-4 py-2 border border-gray-300"
              >
                No roles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
