import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus, X, Loader2 } from "lucide-react";
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

const PictureUpload = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    description: "",
    category: "service",
  });

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviewImages([...previewImages, ...newPreviews]);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // In a real app, you would upload to your backend here
      console.log("Form data:", formData);
      console.log("Files to upload:", previewImages);

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form after successful "upload"
      setFormData({
        eventName: "",
        eventDate: "",
        description: "",
        category: "service",
      });
      setPreviewImages([]);
      setIsSheetOpen(false);

      // Show success message or update gallery
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
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
                      <Label className={"p-1.5"} htmlFor="eventName">Event Name *</Label>
                      <Input
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className={"p-1.5"}  htmlFor="eventDate">Event Date *</Label>
                        <Input
                          id="eventDate"
                          name="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
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
                      </div>
                    </div>

                    <div>
                      <Label className={"p-1.5"}  htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label className={"p-1.5"}  htmlFor="pictures">Pictures *</Label>
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
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Uploaded Pictures
          </h2>
          <p className="text-gray-600">
            Your uploaded pictures will appear here after successful upload
          </p>
        </div>
      </div>
    </section>
  );
};

export default PictureUpload;
