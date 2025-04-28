import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Upload,
  ImagePlus,
  X,
  Loader2,
  Images,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createImage, fetchAllImages } from "../../../store/serviceImage";
import { set } from "date-fns";
import { toast } from "sonner";

const PictureUpload = () => {
  const [servicePhotos, setServicePhotos] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { images } = useSelector((state) => state.serviceImage);

  const [previewImages, setPreviewImages] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(images[0]);

  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    images: [],
  });

  useEffect(() => {
    dispatch(fetchAllImages()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviewImages([...previewImages, ...newPreviews]);
    setServicePhotos(files);
  };

  // Remove an image from preview
  const removeImage = (index) => {
    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index].preview);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Ensure images are properly set
    const submissionData = {
      ...formData,
      images: uploadedImageUrls, // Use the uploaded URLs
    };

    try {
      dispatch(createImage(submissionData)).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAllImages());
          toast.success("Images uploaded successfully!");
          setIsSheetOpen(false);
          // Reset states
          setFormData({
            title: "",
            description: "",
            images: [],
          });
          setUploadedImageUrls([]);
          setPreviewImages([]);
        }
      });
    } catch (error) {
      toast.error("Upload failed");
      console.error("Submission error:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const uploadImagesToCloudinary = async () => {
    try {
      setIsUploading(true); // Add a loading state
      const data = new FormData();

      const files = Array.from(servicePhotos);
      files.forEach((file, index) => {
        data.append(`course`, file);
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/serviceImage/upload`,
        data
      );
      if (res?.data?.success) {
        const uploadedUrls = res?.data?.results?.map(
          (result) => result?.secure_url
        );
        setUploadedImageUrls(uploadedUrls);
        console.log("Uploaded urls:", uploadedUrls);
      } else {
        console.log("Upload failed:", res?.data?.message);
      }
    } catch (error) {
      console.log("Error uploading images:", error.message);
    } finally {
      setIsUploading(false); // Reset the loading state
    }
  };

  useEffect(() => {
    if (servicePhotos) {
      uploadImagesToCloudinary();
    }
  }, [servicePhotos]);

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
      prevIndex === 0 ? selectedEvent?.images?.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedEvent.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <ImagePlus className="h-8 w-8 text-blue-500" />
            <h1 className="text-xl md:text-4xl font-bold text-blue-500">
              Picture Upload
            </h1>
          </div>

          {/* Admin Upload Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Upload className="mr-2 h-4 w-4" />
                Upload Pictures
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
              <div className="p-8">
                <SheetHeader>
                  <SheetTitle>Upload Church Pictures</SheetTitle>
                </SheetHeader>

                {/* Upload Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className={"p-1.5"} htmlFor="title">
                        Event Name *
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className={"p-1.5"} htmlFor="date">
                          Event Date *
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* <div>
                        <Label className={"p-1.5"}  htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={handleCategoryChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="service">
                              Sunday Service
                            </SelectItem>
                            <SelectItem value="event">Special Event</SelectItem>
                            <SelectItem value="outreach">Outreach</SelectItem>
                            <SelectItem value="youth">
                              Youth Ministry
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div> */}
                    </div>

                    {/*  <div>
                      <Label className={"p-1.5"}  htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div> */}

                    <div>
                      <Label className={"p-1.5"} htmlFor="pictures">
                        Pictures *
                      </Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <div className="flex justify-center">
                            <Upload className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="flex text-sm text-gray-600">
                            <Label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                            >
                              <span>Upload files</span>
                              <Input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </Label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {previewImages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Selected Images ({previewImages.length})
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {previewImages.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img.preview}
                              alt={`Preview ${index + 1}`}
                              className="h-32 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsSheetOpen(false)}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isUploading || previewImages.length === 0}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Pictures"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Uploaded Pictures Section */}
        {Array.isArray(images) && images?.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Uploaded Pictures
            </h2>
            <p className="text-gray-600">
              Your uploaded pictures will appear here after successful upload
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default PictureUpload;
