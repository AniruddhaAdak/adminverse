import { User } from "lucide-react";

const users = [
  { id: 1, name: "Sarah Wilson", email: "sarah@example.com", role: "Creator", status: "Active" },
  { id: 2, name: "Michael Brown", email: "michael@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "Emma Davis", email: "emma@example.com", role: "Creator", status: "Active" },
  { id: 4, name: "James Miller", email: "james@example.com", role: "User", status: "Active" },
];

const RecentUsers = () => {
  return (
    <div className="bg-white rounded-xl card-shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Recent Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="font-medium p-4">User</th>
              <th className="font-medium p-4">Role</th>
              <th className="font-medium p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 last:border-0">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm">{user.role}</span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;