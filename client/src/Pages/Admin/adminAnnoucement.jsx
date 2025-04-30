import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X, Calendar as CalendarIcon, User, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import Button
import { Input } from "@/components/ui/input"; // Import Input
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Calendar } from "@/components/ui/calendar"; // Import Calendar
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Import Sheet components
import { toast } from "sonner"; // Import toast
import {
  getAllAnnouncements,
  addAnnouncement,
} from "../../../store/announcementSlice"; // Import Redux actions
import { format } from "date-fns"; // Use date-fns for formatting consistency

const AdminAnnouncement = () => {
  const dispatch = useDispatch();
  const {
    announcements,
    isLoading,
    error, // Get loading and error state
  } = useSelector((state) => state.announcement);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date(),
    author: "",
    category: "",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Renamed for clarity

  // Fetch announcements on component mount
  useEffect(() => {
    dispatch(getAllAnnouncements());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      date: new Date(),
      author: "",
      category: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format date before sending if necessary, e.g., to YYYY-MM-DD string
    const dataToSend = {
      ...formData,
      date: format(formData.date, "yyyy-MM-dd"), // Format date as string
    };

    dispatch(addAnnouncement(dataToSend)).then((res) => {
      if (res?.payload?.success) {
        // No need to dispatch getAllAnnouncements if the slice handles adding correctly
        toast.success("Announcement published successfully");
        setIsSheetOpen(false);
        resetForm();
      } else {
        // Handle error, show error toast
        toast.error(
          res?.payload?.message ||
            res?.payload?.error?.message || // Access nested error message if present
            "Failed to publish announcement"
        );
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Use date-fns format function
  const formatDate = (dateString) => {
    try {
        // Assuming dateString is in 'YYYY-MM-DD' or compatible format
        return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
        console.error("Error formatting date:", dateString, error);
        return "Invalid Date"; // Fallback for invalid dates
    }
  };


  return (
    <div className="container mx-auto py-26">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-blue-400 font-bold">Announcements</h1>
        {/* Use Sheet component */}
        <Sheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            if (!open) resetForm();
            setIsSheetOpen(open);
          }}
        >
          <SheetTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus size={16} />
              New Announcement
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Announcement</SheetTitle>
            </SheetHeader>
            {/* Form using Shadcn components */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Title *
                </label>
                <Input // Use Input component
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium mb-1"
                >
                  Content *
                </label>
                <Textarea // Use Textarea component
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date *
                </label>
                <Calendar // Use Calendar component
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  required
                />
                 <p className="text-sm text-muted-foreground mt-1">
                    Selected: {format(formData.date, "PPP")}
                 </p>
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium mb-1"
                >
                  Author *
                </label>
                <Input // Use Input component
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-1"
                >
                  Category *
                </label>
                {/* Use Select component */}
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="updates">Updates</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button // Use Button component
                  type="button"
                  variant="outline"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Cancel
                </Button>
                <Button // Use Button component
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* Announcements Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p>Loading announcements...</p> {/* Loading state */}
        </div>
      ) : error ? (
         <div className="text-center py-12 text-red-600">
             <p>Error loading announcements: {error.message || error}</p> {/* Error state */}
         </div>
      ) : announcements?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No announcements yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {/* Map over announcements from Redux store */}
          {announcements?.map((announcement) => (
            <div
              key={announcement._id} // Use _id from MongoDB
              className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        announcement.category === "urgent"
                          ? "bg-red-100 text-red-800"
                          : announcement.category === "events"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {announcement.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold">
                      {announcement.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{announcement.content}</p>
                  </div>
                  {/* Add Edit/Delete buttons here if needed later */}
                  {/* <button className="p-1 rounded-md hover:bg-gray-100">
                    <ChevronRight className="h-4 w-4" />
                  </button> */}
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <User className="h-4 w-4 mr-1" />
                    <span>{announcement.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {/* Format date using the updated function */}
                    <span>{formatDate(announcement.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncement;
