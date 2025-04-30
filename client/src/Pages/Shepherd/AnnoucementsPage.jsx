import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, Clock, User, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../../store/announcementSlice";

const AnnouncementsPage = () => {
  const dispatch = useDispatch();
  const {
    announcements,
    isLoading,
    error, // Get loading and error state
  } = useSelector((state) => state.announcement);

  
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Renamed for clarity

  // Fetch announcements on component mount
  useEffect(() => {
    dispatch(getAllAnnouncements());
  }, [dispatch]);


  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
            <Megaphone className="h-8 w-8" />
            Church Announcements
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest news and events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter by Category</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Subscribe to Updates
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading announcements...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {announcement.title}
                  </CardTitle>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {announcement.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{announcement.content}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>{announcement.author}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(announcement.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
