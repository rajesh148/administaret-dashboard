import React from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch data from Redux store
  const users = useSelector((state) => state.users.userList);
  const roles = useSelector((state) => state.roles.roleList);
  const recentActivities = useSelector((state) => state.activity.logs);

  // Overview Data
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const totalRoles = roles.length;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div
          className="p-4 text-center font-bold text-xl border-b border-gray-700 cursor-pointer"
          onClick={() => navigate("/")} // Navigate to the root path when clicked
        >
          RBAC Dashboard
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/roles"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                Roles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/permissions"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                Permissions
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-6 space-y-6">
          {/* Overview Section */}
          {location.pathname === "/" && ( // Show this section only on the root path
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Total Users</h2>
                <p className="text-2xl">{totalUsers}</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Active Users</h2>
                <p className="text-2xl">{activeUsers}</p>
              </div>
              <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Total Roles</h2>
                <p className="text-2xl">{totalRoles}</p>
              </div>
            </div>
          )}

          {/* Quick Actions Section */}
          {location.pathname === "/" && ( // Show Quick Actions only on the root path
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-x-4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  Create New User
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    navigate("/roles");
                  }}
                >
                  Create New Role
                </button>
              </div>
            </div>
          )}

          {/* Recent Activity Section */}
          {location.pathname === "/" && ( // Show Recent Activity only on the root path
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              <ul className="space-y-2">
                {recentActivities.length === 0 ? (
                  <p className="text-gray-500">No recent activity available.</p>
                ) : (
                  recentActivities
                    .slice(-10)
                    .reverse()
                    .map((activity, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
                      >
                        <span>{activity.message}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </li>
                    ))
                )}
              </ul>
            </div>
          )}

          {/* Outlet for Other Pages */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
