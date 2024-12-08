import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, deleteUserWithActivity } from "../../features/usersSlice";

const UserList = ({ onEdit }) => {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  return (
    <div className="p-4 text-black">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="table w-full border-collapse border border-gray-300">
        <thead className="text-black">
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.email} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="btn btn-primary btn-sm mr-2"
                  // onClick={() => onEdit(user)}
                  onClick={() => {
                    onEdit(user);
                    dispatch({
                      type: "activity/addActivity",
                      payload: {
                        timestamp: new Date().toISOString(),
                        message: `Editing user "${user.name}".`,
                      },
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  // onClick={() => dispatch(deleteUser(user.id))}
                  onClick={() => {
                    // Dispatch the delete action with the user ID to remove the specific user
                    dispatch(deleteUserWithActivity(user.id, user.name));
                    dispatch(deleteUser(user.id)); // This should delete only the specific user
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="text-center text-gray-500 px-4 py-2 border border-gray-300"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
