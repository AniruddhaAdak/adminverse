import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { date: "Mon", users: 400 },
  { date: "Tue", users: 300 },
  { date: "Wed", users: 520 },
  { date: "Thu", users: 450 },
  { date: "Fri", users: 600 },
  { date: "Sat", users: 450 },
  { date: "Sun", users: 650 },
];

const EngagementChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl card-shadow">
      <h3 className="text-lg font-semibold mb-6">User Engagement</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#9b87f5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementChart;