import { useQuery } from "@tanstack/react-query";
import { Users as UsersIcon, UserPlus, UserMinus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=john"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=jane"
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Editor",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=bob"
  }
];

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Return mock data instead of making API call
      return mockUsers;
    },
  });

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">User Management</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{user.role}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;