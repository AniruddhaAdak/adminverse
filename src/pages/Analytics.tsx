import { BarChart2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="md:ml-64 p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <BarChart2 className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Analytics</h1>
          </div>
          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p>Analytics content coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;