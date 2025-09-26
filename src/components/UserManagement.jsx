import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock data - in a real app, you would fetch this from your API
  const mockUsers = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "admin@example.com",
      first_name: "Admin",
      last_name: "User",
      phone_number: "+1234567890",
      profile_image: "image/upload/v1756215182/mhmytgqpr4q0ne2p6hvc.png",
      profile_image_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      role: "admin",
      is_verified: true,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      last_login: "2024-01-15T10:30:00Z",
    },
    {
      id: "fdce037a-f177-4f5e-b464-9bb8d0185b23",
      email: "example@gmail.com",
      first_name: "fahim",
      last_name: "muntasir",
      phone_number: null,
      profile_image: null,
      profile_image_url: null,
      role: "user",
      is_verified: false,
      is_active: false,
      created_at: "2025-08-26T11:10:23.316909Z",
      last_login: null,
    },
    {
      id: "6ba7b811-9dad-11d1-80b4-00c04fd430c9",
      email: "jane.smith@example.com",
      first_name: "Jane",
      last_name: "Smith",
      phone_number: "+1654321987",
      profile_image:
        "image/upload/profile_images/6ba7b811-9dad-11d1-80b4-00c04fd430c9_profile.jpg",
      profile_image_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      role: "user",
      is_verified: true,
      is_active: true,
      created_at: "2024-01-10T11:30:00Z",
      last_login: "2024-01-13T14:20:00Z",
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      phone_number: "+1987654321",
      profile_image:
        "image/upload/profile_images/6ba7b810-9dad-11d1-80b4-00c04fd430c8_profile.jpg",
      profile_image_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      role: "user",
      is_verified: true,
      is_active: true,
      created_at: "2024-01-05T09:15:00Z",
      last_login: "2024-01-14T15:45:00Z",
    },
    {
      id: "55e45d7b-d735-4948-9f66-36dffbe1eb89",
      email: "admin@gmail.com",
      first_name: "fahim",
      last_name: "muntasir",
      phone_number: null,
      profile_image: null,
      profile_image_url: null,
      role: "admin",
      is_verified: false,
      is_active: true,
      created_at: "2025-08-25T11:00:51.685588Z",
      last_login: "2025-09-20T09:42:36.261424Z",
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/v1/users/');
        // const data = await response.json();
        // setUsers(data);

        // Using mock data for demonstration
        setTimeout(() => {
          setUsers(mockUsers);
          setFilteredUsers(mockUsers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter and sort users
    let result = [...users];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.first_name.toLowerCase().includes(term) ||
          user.last_name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((user) =>
        statusFilter === "active" ? user.is_active : !user.is_active
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = `${a.first_name} ${a.last_name}`.toLowerCase();
          bValue = `${b.first_name} ${b.last_name}`.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "role":
          aValue = a.role;
          bValue = b.role;
          break;
        case "status":
          aValue = a.is_active;
          bValue = b.is_active;
          break;
        case "last_login":
          aValue = a.last_login || "";
          bValue = b.last_login || "";
          break;
        default:
          aValue = a.first_name.toLowerCase();
          bValue = b.first_name.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, statusFilter, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600 mt-2">Manage all users in the system</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="role">Sort by Role</option>
              <option value="status">Sort by Status</option>
              <option value="last_login">Sort by Last Login</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Login
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.profile_image_url ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.profile_image_url}
                              alt={`${user.first_name} ${user.last_name}`}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {getInitials(user.first_name, user.last_name)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Joined {formatDate(user.created_at)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">
                        {user.phone_number || "No phone"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {user.is_verified ? (
                          <span className="flex items-center">
                            <CheckBadgeIcon className="h-4 w-4 text-blue-500 mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <XCircleIcon className="h-4 w-4 text-gray-400 mr-1" />
                            Not verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.last_login)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewUserDetails(user)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                          title="View details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                          title="Edit user"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                          title="Delete user"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                User Details
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-center mb-6">
                {selectedUser.profile_image_url ? (
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={selectedUser.profile_image_url}
                    alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-2xl font-medium">
                      {getInitials(
                        selectedUser.first_name,
                        selectedUser.last_name
                      )}
                    </span>
                  </div>
                )}
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-2">
                    Personal Information
                  </h5>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">
                        First Name:{" "}
                      </span>
                      <span className="text-sm font-medium">
                        {selectedUser.first_name}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Last Name: </span>
                      <span className="text-sm font-medium">
                        {selectedUser.last_name}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Phone: </span>
                      <span className="text-sm font-medium">
                        {selectedUser.phone_number || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-2">
                    Account Information
                  </h5>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Role: </span>
                      <span className="text-sm font-medium capitalize">
                        {selectedUser.role}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status: </span>
                      <span
                        className={`text-sm font-medium ${
                          selectedUser.is_active
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedUser.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Verification:{" "}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          selectedUser.is_verified
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {selectedUser.is_verified ? "Verified" : "Not verified"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Joined: </span>
                      <span className="text-sm font-medium">
                        {formatDate(selectedUser.created_at)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Last Login:{" "}
                      </span>
                      <span className="text-sm font-medium">
                        {formatDate(selectedUser.last_login)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
