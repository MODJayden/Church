import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActivities } from "../../../store/activitySlice";

const Upcoming = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const { activities } = useSelector((state) => state.activity);

  const dispatch=useDispatch()
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "in-person",
    guests: "0",
    notes: "",
  });
 
 useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Registration data:", {
        eventId: selectedEvent.id,
        ...registrationData,
      });
      setIsRegistering(false);
      setSelectedEvent(null);
      setRegistrationData({
        name: "",
        email: "",
        phone: "",
        attendance: "in-person",
        guests: "0",
        notes: "",
      });

      toast({
        title: "Registration Successful!",
        description: `You've been registered for ${selectedEvent.title}. Confirmation sent to ${registrationData.email}`,
        className: "bg-green-50 text-green-800",
      });
    }, 1500);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for these life-changing gatherings and experiences
          </p>
        </div>

        {/* Events Grid */}
        {!selectedEvent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            { Array.isArray(activities) && activities?.map((event) => (
              <div
                key={event._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>
                        {event.registered}/{event.capacity} registered
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex gap-2">
                   
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setSelectedEvent(event);
                        document
                          .getElementById("registration-form")
                          ?.scrollIntoView();
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Event Details View */
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setSelectedEvent(null)}
              className="mb-6 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to all events
            </Button>

            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x400?text=Event+Image";
                  }}
                />
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {selectedEvent.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">
                      Event Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start text-gray-700">
                        <Calendar className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p>{formatDate(selectedEvent.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start text-gray-700">
                        <Clock className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p>{selectedEvent.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start text-gray-700">
                        <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p>{selectedEvent.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start text-gray-700">
                        <Users className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Availability</p>
                          <p>
                            {selectedEvent.registered}/{selectedEvent.capacity}{" "}
                            registered (
                            {Math.round(
                              (selectedEvent.registered /
                                selectedEvent.capacity) *
                                100
                            )}
                            % full)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-lg">
                      More Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Speakers</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          {selectedEvent.details.speakers.map((speaker, i) => (
                            <li key={i}>{speaker}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">What to Bring</h4>
                        <p className="text-gray-700">
                          {selectedEvent.details.requirements}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Contact</h4>
                        <p className="text-gray-700">
                          {selectedEvent.details.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-8">
                  {selectedEvent.description}
                </p>

                {/* Registration Form */}
                <div
                  id="registration-form"
                  className="bg-gray-50 rounded-lg p-6 mt-8"
                >
                  <h3 className="text-xl font-bold mb-6">
                    Register for this Event
                  </h3>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={registrationData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={registrationData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={registrationData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select
                          onValueChange={(value) =>
                            setRegistrationData((prev) => ({
                              ...prev,
                              guests: value,
                            }))
                          }
                          value={registrationData.guests}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-3">Attendance Method *</Label>
                      <RadioGroup
                        defaultValue="in-person"
                        className="flex gap-4"
                        onValueChange={(value) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            attendance: value,
                          }))
                        }
                        value={registrationData.attendance}
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-person" id="in-person" />
                          <Label htmlFor="in-person">In Person</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online">Online</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="notes">Special Requirements</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={registrationData.notes}
                        onChange={handleInputChange}
                        placeholder="Dietary restrictions, accessibility needs, etc."
                        rows={3}
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                        disabled={isRegistering}
                      >
                        {isRegistering ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Complete Registration"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Upcoming;
