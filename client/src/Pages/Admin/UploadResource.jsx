import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Loader2, FileAudio, Book, Shirt } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

const UploadResource = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    sermon: false,
    books: false,
    merchandise: false,
  });
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    file: null,
    price: "",
    size: "",
    coverImage: null,
  });

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));

    // Reset form when changing categories
    setFormData({
      title: "",
      author: "",
      description: "",
      file: null,
      price: "",
      size: "",
      coverImage: null,
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileChange = (e, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Prepare form data for API
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);

      if (selectedCategories.sermon) {
        payload.append("type", "sermon");
        payload.append("audio", formData.file);
        payload.append("preacher", formData.author);
        payload.append("date", new Date().toISOString());
      } else if (selectedCategories.books) {
        payload.append("type", "book");
        payload.append("pdf", formData.file);
        payload.append("author", formData.author);
        payload.append("cover", formData.coverImage);
      } else if (selectedCategories.merchandise) {
        payload.append("type", "merchandise");
        payload.append("image", formData.coverImage);
        payload.append("price", formData.price);
        payload.append("size", formData.size);
      }

      // Simulate API call (replace with actual fetch)
      console.log("Uploading:", Object.fromEntries(payload));
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form on success
      setFormData({
        title: "",
        author: "",
        description: "",
        file: null,
        price: "",
        size: "",
        coverImage: null,
      });
      setIsSheetOpen(false);
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
            <Upload className="h-8 w-8 text-blue-500" />
            <h1 className="text-xl md:text-4xl font-bold text-blue-500">
              Upload Resources
            </h1>
          </div>

          {/* Admin Upload Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
              <div className="p-8">
                <SheetHeader>
                  <SheetTitle>Upload New Resource</SheetTitle>
                </SheetHeader>

                {/* Resource Upload Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  {/* Category Selection */}
                  <div>
                    <Label className="block mb-3">Resource Type *</Label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sermon"
                          checked={selectedCategories.sermon}
                          onCheckedChange={() => handleCategoryChange("sermon")}
                        />
                        <Label
                          htmlFor="sermon"
                          className="flex items-center gap-2"
                        >
                          <FileAudio className="h-4 w-4" />
                          Sermon Audio
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="books"
                          checked={selectedCategories.books}
                          onCheckedChange={() => handleCategoryChange("books")}
                        />
                        <Label
                          htmlFor="books"
                          className="flex items-center gap-2"
                        >
                          <Book className="h-4 w-4" />
                          Books & Publications
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="merchandise"
                          checked={selectedCategories.merchandise}
                          onCheckedChange={() =>
                            handleCategoryChange("merchandise")
                          }
                        />
                        <Label
                          htmlFor="merchandise"
                          className="flex items-center gap-2"
                        >
                          <Shirt className="h-4 w-4" />
                          Church Merchandise
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Common Fields */}
                  <div>
                    <Label className={"my-2"} htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label className={"my-2"}  htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  {/* Dynamic Fields Based on Category */}
                  {selectedCategories.sermon && (
                    <>
                      <div>
                        <Label className={"my-2"}  htmlFor="preacher">Preacher *</Label>
                        <Input
                          id="preacher"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label className={"my-2"}  htmlFor="audio">Audio File * (MP3)</Label>
                        <Input
                          id="audio"
                          type="file"
                          accept="audio/mp3"
                          onChange={(e) => handleFileChange(e, "file")}
                          required
                        />
                      </div>
                    </>
                  )}

                  {selectedCategories.books && (
                    <>
                      <div>
                        <Label className={"my-2"}  htmlFor="author">Author *</Label>
                        <Input
                          id="author"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className={"my-2"}  htmlFor="pdf">PDF File *</Label>
                          <Input
                            id="pdf"
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "file")}
                            required
                          />
                        </div>

                        <div>
                          <Label className={"my-2"}  htmlFor="cover">Cover Image *</Label>
                          <Input
                            id="cover"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "coverImage")}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {selectedCategories.merchandise && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className={"my-2"}  htmlFor="price">Price *</Label>
                          <Input
                            id="price"
                            name="price"
                            type="text"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <Label className={"my-2"}  htmlFor="size">Size Options</Label>
                          <Input
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            placeholder="S, M, L, XL"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className={"my-2"}  htmlFor="merch-image">Product Image *</Label>
                        <Input
                          id="merch-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "coverImage")}
                          required
                        />
                      </div>
                    </>
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
                      disabled={
                        isUploading ||
                        !Object.values(selectedCategories).some(Boolean)
                      }
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Resource"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Uploaded Resources Section */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Uploaded Resources
          </h2>
          <p className="text-gray-600">
            Your uploaded resources will appear here after successful upload
          </p>
        </div>
      </div>
    </section>
  );
};

export default UploadResource;
