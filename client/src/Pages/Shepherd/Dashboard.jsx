import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Calendar,
  BookOpen,
  HandCoins,
  Users,
  BarChart2,
  Bell,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications] = useState([
    {
      id: 1,
      title: "Bible Study Tonight",
      message: "Join us at 7 PM in the main hall",
      read: false,
    },
    {
      id: 2,
      title: "Tithe Reminder",
      message: "Your monthly tithe is due soon",
      read: true,
    },
  ]);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Member Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening in your church community.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "overview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "giving"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("giving")}
        >
          Giving
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "groups"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("groups")}
        >
          My Groups
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="font-medium">Sunday Service</p>
                <p className="text-sm text-gray-600">April 28, 8:30 AM</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <p className="font-medium">Bible Study</p>
                <p className="text-sm text-gray-600">May 2, 7:00 PM</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="text-blue-600 p-0" asChild>
              <Link to="/events">View all events</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Giving Summary */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Giving Summary
            </CardTitle>
            <HandCoins className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Year to Date</p>
              <p className="font-medium">$1,250.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Last Gift</p>
              <p className="font-medium">$100.00 (Apr 15)</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="text-blue-600 p-0" asChild>
              <Link to="/giving">View giving history</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Bible Reading Plan */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Today's Reading
            </CardTitle>
            <BookOpen className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="font-medium mb-1">John 3:16-21</p>
            <p className="text-sm text-gray-600">
              "For God so loved the world that he gave his one and only Son..."
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="text-blue-600 p-0" asChild>
              <Link to="/bible-plan">View reading plan</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Small Groups */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">My Groups</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Men's Fellowship</p>
                <p className="text-sm text-gray-600">Meets every Tuesday</p>
              </div>
              <div>
                <p className="font-medium">Prayer Warriors</p>
                <p className="text-sm text-gray-600">Meets every Friday</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="text-blue-600 p-0" asChild>
              <Link to="/groups">View all groups</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Attendance */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Attendance</CardTitle>
            <BarChart2 className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Last 30 Days</p>
              <p className="font-medium">3 services</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Year to Date</p>
              <p className="font-medium">15 services</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="text-blue-600 p-0" asChild>
              <Link to="/attendance">View details</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16" asChild>
                <Link to="/give-online">
                  <HandCoins className="mr-2 h-4 w-4" />
                  Give Online
                </Link>
              </Button>
              <Button variant="outline" className="h-16" asChild>
                <Link to="/events">
                  <Calendar className="mr-2 h-4 w-4" />
                  Register for Event
                </Link>
              </Button>
              <Button variant="outline" className="h-16" asChild>
                <Link to="/prayer-request">
                  <span className="mr-2">🙏</span>
                  Prayer Request
                </Link>
              </Button>
              <Button variant="outline" className="h-16" asChild>
                <Link to="/volunteer">
                  <Users className="mr-2 h-4 w-4" />
                  Volunteer
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
