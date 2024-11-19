import { Users, Eye, MessageSquare, Share } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import EngagementChart from "@/components/EngagementChart";
import RecentUsers from "@/components/RecentUsers";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value="2,543"
              icon={<Users size={24} />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Total Views"
              value="8.9k"
              icon={<Eye size={24} />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Messages"
              value="1.2k"
              icon={<MessageSquare size={24} />}
              trend={{ value: 4, isPositive: false }}
            />
            <StatCard
              title="Shares"
              value="642"
              icon={<Share size={24} />}
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8">
            <EngagementChart />
            <RecentUsers />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;