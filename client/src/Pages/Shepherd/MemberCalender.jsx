import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActivities } from "../../../store/activitySlice";

// Sample events data - replace with your actual events

// Helper functions
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const Calendar = () => {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const { activities, isLoading } = useSelector((state) => state.activity);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [view, setView] = useState("month"); // 'month' or 'list'

  useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);
  // Navigation functions
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(currentDate.getMonth());
    setCurrentYear(currentDate.getFullYear());
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };

  // Calendar rendering
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 p-1 border border-gray-100"
        ></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const dayEvents = activities?.filter(
        (event) =>
          event.date === dateStr ||
          (event.endDate && dateStr >= event.date && dateStr <= event.endDate)
      );

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`h-24 p-1 border border-gray-100 overflow-y-auto cursor-pointer transition-colors ${
            dateStr === selectedDate ? "bg-blue-50" : "hover:bg-gray-50"
          } ${
            dateStr === currentDate.toISOString().split("T")[0]
              ? "border-blue-300 border-2"
              : ""
          }`}
        >
          <div className="font-medium text-right mb-1">{day}</div>
          {dayEvents.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className={`text-xs p-1 mb-1 rounded truncate ${
                event.category === "service"
                  ? "bg-blue-100 text-blue-800"
                  : event.category === "study"
                  ? "bg-purple-100 text-purple-800"
                  : event.category === "event"
                  ? "bg-green-100 text-green-800"
                  : event.category === "fellowship"
                  ? "bg-yellow-100 text-yellow-800"
                  : event.category === "camp"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {event.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-xs text-gray-500">
              +{dayEvents.length - 2} more
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  // Get events for selected date
  const selectedDateEvents = activities?.filter(
    (event) =>
      selectedDate >= event.date &&
      (event.endDate
        ? selectedDate <= event.endDate
        : selectedDate === event.date)
  );

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
              Church Calendar
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with all our church activities and events
          </p>
        </div>

        {/* Calendar Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">
              {months[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={view === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("month")}
            >
              Month View
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              List View
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        {view === "month" ? (
          <div className="mb-12">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center font-medium text-gray-500 text-sm py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
          </div>
        ) : (
          /* List View */
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              Events in {months[currentMonth]} {currentYear}
            </h3>
            <div className="space-y-4">
              {activities
                ?.filter((event) => {
                  const eventDate = new Date(event?.date);
                  return (
                    eventDate.getMonth() === currentMonth &&
                    eventDate.getFullYear() === currentYear
                  );
                })
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border ${
                      selectedDate === event.date
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedDate(event.date)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg">{event.title}</h4>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        {event.endDate && (
                          <span>
                            {" - "}
                            {new Date(event.endDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                    {event.description && (
                      <p className="mt-2 text-gray-700">{event.description}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Selected Date Events */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            {selectedDate === currentDate.toISOString().split("T")[0]
              ? "Today's Events"
              : `Events on ${new Date(selectedDate).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}`}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{event.title}</h4>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        event.category === "service"
                          ? "bg-blue-100 text-blue-800"
                          : event.category === "study"
                          ? "bg-purple-100 text-purple-800"
                          : event.category === "event"
                          ? "bg-green-100 text-green-800"
                          : event.category === "fellowship"
                          ? "bg-yellow-100 text-yellow-800"
                          : event.category === "camp"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.category}
                    </div>
                  </div>
                  {event.description && (
                    <p className="mt-2 text-gray-700">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No events scheduled for this day</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
