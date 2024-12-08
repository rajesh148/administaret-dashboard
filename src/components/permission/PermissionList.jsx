import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePermission,
  deletePermissionWithActivity,
} from "../../features/permissionsSlice";
import { addActivity } from "../../features/activitySlice";

const PermissionList = ({ onEdit }) => {
  const permissions = useSelector((state) => state.permissions.permissionList); // Ensure 'permissions.list' matches your state
  const dispatch = useDispatch();

  console.log(permissions.permissionList);

  // if (!permissions) return;

  // if (permissions.length <= 0) {
  //   return;
  // }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Permissions</h2>
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-black">
              Permission Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-black">
                {permission.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-black">
                {permission.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="btn btn-primary btn-sm mr-2"
                  // onClick={() => onEdit(permission)}
                  onClick={() => {
                    onEdit(permission);
                    dispatch(
                      addActivity({
                        timestamp: new Date().toISOString(),
                        message: `Editing permission "${permission.name}".`,
                      })
                    );
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  // onClick={() => dispatch(deletePermission(permission.id))}
                  onClick={() => {
                    dispatch(
                      deletePermissionWithActivity(
                        permission.id,
                        permission.name
                      )
                    );
                    deletePermission(permission.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {permissions.length === 0 && (
            <tr>
              <td
                colSpan="3"
                className="text-center text-gray-500 px-4 py-2 border border-gray-300"
              >
                No permissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionList;
