import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Images } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImages } from "../../../store/serviceImage";

const Gallery = () => {
  const { images } = useSelector((state) => state.serviceImage);

  const [selectedEvent, setSelectedEvent] = useState(images[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllImages()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);

  const openImageViewer = (eventIndex, imageIndex) => {
    setSelectedEvent(images[eventIndex]);
    setCurrentImageIndex(imageIndex);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedEvent.images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedEvent.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Images className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
              Church Gallery
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Relive our special moments and services through photos
          </p>
        </div>

        <main>
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            {Array.isArray(images) &&
              images?.map((event) => (
                <Button
                  key={event._id}
                  variant={
                    selectedEvent?._id === event._id ? "default" : "outline"
                  }
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  {event.title}
                </Button>
              ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {selectedEvent?.images?.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 aspect-square"
                onClick={() =>
                  openImageViewer(
                    images.findIndex((e) => e._id === selectedEvent?._id),
                    index
                  )
                }
              >
                <img
                  src={images}
                  alt={`${selectedEvent?.title} - Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    View Photo
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Image Viewer Modal */}
          {isViewerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
              <button
                onClick={closeImageViewer}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                ✕
              </button>

              <button
                onClick={goToPrevious}
                className="absolute left-4 md:left-8 text-white hover:text-gray-300 p-2"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <div className="max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
                <img
                  src={selectedEvent?.images[currentImageIndex]}
                  alt={`${selectedEvent?.title} - Photo ${
                    currentImageIndex + 1
                  }`}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>

              <button
                onClick={goToNext}
                className="absolute right-4 md:right-8 text-white hover:text-gray-300 p-2"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                {currentImageIndex + 1} of {selectedEvent?.images?.length} -{" "}
                {selectedEvent?.title}
              </div>
            </div>
          )}
        </main>

        {/* Upload Section (for admins) */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-blue-500 mb-2">
            Have Photos to Share?
          </h2>
          <p className="text-gray-600 mb-4">
            Members can submit their service photos to be included in the
            gallery
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Submit Your Photos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
