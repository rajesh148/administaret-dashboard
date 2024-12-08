import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, deleteUserWithActivity } from "../../features/usersSlice";

const UserList = ({ onEdit }) => {
  const users = useSelector((state) => state.users.userList);
  const roles = useSelector((state) => state.roles.roleList);
  const errorMessage = useSelector((state) => state.users.errorMessage);
  const dispatch = useDispatch();

  console.log("in user", roles);
  console.log("in user", users);

  return (
    <div className="p-4 text-black">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {/* Display error message if a duplicate user exists */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <table className="table w-full border-collapse border border-gray-300">
        <thead className="text-black">
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">SL.No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Permisssions</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.email} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              {/* <td className="border border-gray-300 px-4 py-2">
                {user.role && user.role.name ? user.role.name : "No Role"}
              </td> */}
              <td className="border border-gray-300 px-4 py-2">
                {user.permissions.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() =>
                    dispatch(deleteUserWithActivity(user.id, user.name))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
