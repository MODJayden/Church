import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, X, Clock, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Sample events data - will be replaced with uploaded events
const initialEvents = [
  {
    id: 1,
    title: "Sunday Service",
    date: new Date("2023-06-04"),
    time: "8:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "Weekly worship service with Holy Communion",
    category: "service",
  },
  {
    id: 2,
    title: "Bible Study",
    date: new Date("2023-06-07"),
    time: "6:00 PM - 7:30 PM",
    location: "Fellowship Hall",
    description: "Mid-week Bible study and prayer meeting",
    category: "study",
  },
];

const Activities = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    time: "",
    location: "",
    description: "",
    category: "",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date) => {
    setNewEvent((prev) => ({ ...prev, date }));
  };

  const handleCategoryChange = (value) => {
    setNewEvent((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventWithId = {
      ...newEvent,
      id: Date.now(), // Simple ID generation
    };
    setEvents((prev) => [...prev, eventWithId]);
    setNewEvent({
      title: "",
      date: new Date(),
      time: "",
      location: "",
      description: "",
      category: "",
    });
    setIsSheetOpen(false);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header with Add Button */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
              Church Activities
            </h1>
          </div>

          {/* Admin Upload Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <div className="p-8">
                <SheetHeader>
                  <SheetTitle>Add New Church Event</SheetTitle>
                </SheetHeader>

                {/* Event Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium mb-1"
                    >
                      Event Title *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Event Date *
                    </label>
                    <Calendar
                      mode="single"
                      selected={newEvent.date}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium mb-1"
                    >
                      Time *
                    </label>
                    <Input
                      id="time"
                      name="time"
                      value={newEvent.time}
                      onChange={handleInputChange}
                      placeholder="e.g. 6:00 PM - 8:00 PM"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium mb-1"
                    >
                      Location *
                    </label>
                    <Input
                      id="location"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
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
                    <Select
                      value={newEvent.category}
                      onValueChange={handleCategoryChange}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service">Sunday Service</SelectItem>
                        <SelectItem value="study">Bible Study</SelectItem>
                        <SelectItem value="event">Special Event</SelectItem>
                        <SelectItem value="fellowship">Fellowship</SelectItem>
                        <SelectItem value="music">Music Ministry</SelectItem>
                        <SelectItem value="outreach">Outreach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-1"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newEvent.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Upload Event
                    </Button>
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Events Display */}
        <div className="space-y-6">
          {events.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No events scheduled yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Click "Add Event" to schedule church activities
              </p>
            </div>
          ) : (
            events
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event) => (
                <div
                  key={event.id}
                  className="p-6 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            event.category === "service"
                              ? "bg-blue-500"
                              : event.category === "study"
                              ? "bg-purple-500"
                              : event.category === "event"
                              ? "bg-green-500"
                              : event.category === "fellowship"
                              ? "bg-yellow-500"
                              : event.category === "music"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <h3 className="text-xl font-bold">{event.title}</h3>
                      </div>

                      <div className="flex items-center text-gray-600 mt-2">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>{format(event.date, "PPP")}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mt-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.category === "service"
                            ? "bg-blue-100 text-blue-800"
                            : event.category === "study"
                            ? "bg-purple-100 text-purple-800"
                            : event.category === "event"
                            ? "bg-green-100 text-green-800"
                            : event.category === "fellowship"
                            ? "bg-yellow-100 text-yellow-800"
                            : event.category === "music"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.category === "service"
                          ? "Service"
                          : event.category === "study"
                          ? "Bible Study"
                          : event.category === "event"
                          ? "Special Event"
                          : event.category === "fellowship"
                          ? "Fellowship"
                          : event.category === "music"
                          ? "Music Ministry"
                          : "Outreach"}
                      </span>
                    </div>
                  </div>

                  {event.description && (
                    <p className="mt-4 text-gray-700">{event.description}</p>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Activities;
