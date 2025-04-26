import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Users, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { getAllGates } from "../../../store/gateSlice";
// Sample gate data - replace with your actual data


const Gates = () => {
  const {gates} = useSelector((state) => state.gate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGates()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);


  return (
    <section className="bg-white py-18 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
            Church Gates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join one of our ministry gates to grow spiritually and connect with
            others
          </p>
        </div>

        {/* Gates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gates?.map((gate) => (
            <div
              key={gate.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
             

              {/* Gate Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {gate.name}
                </h3>
                <p className="text-gray-600 mb-4">{gate.description}</p>

                {/* Meeting Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{gate.meetingTime}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{gate.location}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Led by {gate.gateLeader}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link to={`/join-gate/${gate.id}`}>Join Gate</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-blue-500 text-blue-500 hover:bg-blue-50"
                  >
                    <Link to={`/gate-details/${gate.id}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            Can't Find Your Gate?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're constantly adding new ministry gates. If you don't see one
            that fits your calling, contact us about starting a new gate
            ministry.
          </p>
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-100"
          >
            Contact Church Office
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gates;
