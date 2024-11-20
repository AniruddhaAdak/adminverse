import { useQuery } from "@tanstack/react-query";
import { Users as UsersIcon, UserPlus, UserMinus, Search, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
}

// Mock data as fallback
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
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Using JSONPlaceholder as a reliable test API
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        // Using JSONPlaceholder as a reliable test API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        
        const data = await response.json();
        // Transform the JSONPlaceholder data to match our User interface
        return data.map((user: any) => ({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.company?.name ? "Admin" : "User",
          status: "active",
          avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${user.username}`
        }));
      } catch (error) {
        console.warn('Using mock data due to API error:', error);
        return mockUsers;
      }
    },
  });

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing users list",
      description: "The users list is being updated...",
    });
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="md:ml-64 p-8 transition-all duration-300">
        <div className="flex items-center justify-center h-full">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="md:ml-64 p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">User Management</h1>
            <Button onClick={handleRefresh} variant="outline" className="gap-2">
              <RefreshCw size={16} />
              Refresh
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UsersIcon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredUsers.length}</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserPlus className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filteredUsers.filter(u => u.status === 'active').length}
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
                <UserMinus className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filteredUsers.filter(u => u.status === 'inactive').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Users List</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow animate-fade-in"
                  >
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
      </main>
    </div>
  );
};

export default Users;