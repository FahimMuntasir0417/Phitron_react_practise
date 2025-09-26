import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    growthRate: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data fetch - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setStats({
          totalUsers: 1245,
          totalRevenue: 89234,
          totalOrders: 567,
          growthRate: 12.5,
        });

        setRecentActivities([
          {
            id: 1,
            user: "John Doe",
            action: "placed an order",
            time: "2 min ago",
            type: "order",
          },
          {
            id: 2,
            user: "Sarah Smith",
            action: "signed up",
            time: "5 min ago",
            type: "signup",
          },
          {
            id: 3,
            user: "Mike Johnson",
            action: "completed payment",
            time: "10 min ago",
            type: "payment",
          },
          {
            id: 4,
            user: "Emma Wilson",
            action: "updated profile",
            time: "15 min ago",
            type: "profile",
          },
          {
            id: 5,
            user: "Alex Brown",
            action: "cancelled order",
            time: "20 min ago",
            type: "order",
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  // Stat Cards Component
  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {typeof value === "number" && value > 1000
              ? `$${(value / 1000).toFixed(1)}k`
              : value}
          </p>
          {change && (
            <p
              className={`text-sm mt-1 ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change > 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </div>
  );

  // Activity Item Component
  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case "order":
          return "🛒";
        case "signup":
          return "👤";
        case "payment":
          return "💳";
        case "profile":
          return "📝";
        default:
          return "📢";
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
        <span className="text-lg">{getActivityIcon(activity.type)}</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            <span className="font-semibold">{activity.user}</span>{" "}
            {activity.action}
          </p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon="👥"
            color="bg-blue-100 text-blue-600"
            change={8.2}
          />
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon="💰"
            color="bg-green-100 text-green-600"
            change={12.5}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon="📦"
            color="bg-purple-100 text-purple-600"
            change={5.7}
          />
          <StatCard
            title="Growth Rate"
            value={`${stats.growthRate}%`}
            icon="📈"
            color="bg-orange-100 text-orange-600"
            change={3.2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Activities
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <Link
                  to="/activities"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View all activities →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  📊 View Analytics
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                  👥 Manage Users
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  📦 Order Management
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                  ⚙️ System Settings
                </button>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance
              </h3>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
