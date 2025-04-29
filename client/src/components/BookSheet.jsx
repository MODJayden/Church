import { use, useEffect, useState } from "react";
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
import axios from "axios";
import { addBook, getAllBooks } from "../../store/books";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const BookSheet = ({ setIsBookSheetOpen }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [bookThumbnail, setBookThumbnail] = useState();
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState();
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverUrl: "",
    pdfUrl: "",
  });

  const handleThumbnailChange = async (e) => {
    const selectedImg = e.target.files?.[0];
    setBookThumbnail(selectedImg);
  };

  const handleFileChange = async (e) => {
    const selectedImg = e.target.files?.[0];
    setPdfFile(selectedImg);
  };

  const uploadImageToCloudinary = async () => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("thumbnail", bookThumbnail);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/book/upload-thumbnail`,
        data
      );

      if (res?.data?.success) {
        setUploadedThumbnailUrl(res?.data?.result?.secure_url);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsUploading(false);
    }
  };
  const uploadFileToCloudinary = async () => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("thumbnail", pdfFile);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/book/upload-thumbnail`,
        data
      );
      if (res?.data?.success) {
        setUploadedPdfUrl(res?.data?.result?.secure_url);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsUploading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      pdfUrl: "",
      coverUrl: "",
    });
  };

  useEffect(() => {
    if (pdfFile) {
      uploadFileToCloudinary();
    }
  }, [pdfFile]);

  useEffect(() => {
    if (bookThumbnail) {
      uploadImageToCloudinary();
    }
  }, [bookThumbnail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedFormData = {
      ...formData,
      pdfUrl: uploadedPdfUrl,
      coverUrl: uploadedThumbnailUrl,
    };
    setFormData(submittedFormData);
    dispatch(addBook(formData)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getAllBooks());
        toast.success("Book added successfully");
        setIsBookSheetOpen(false);
        resetForm();
      } else {
        toast.error("Error adding book,try again");
      }
    });
  };
  return (
    <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
      <div className="p-8">
        <SheetHeader>
          <SheetTitle>Upload New Resource</SheetTitle>
        </SheetHeader>

        {/* Resource Upload Form */}
        <form className="mt-6 space-y-6">
          {/* Category Selection */}
          <div>
            <Label className="block mb-3">Resource Type *</Label>
          </div>

          {/* Common Fields */}
          <>
            <div>
              <Label className={"my-2"} htmlFor="title">
                Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label className={"my-2"} htmlFor="author">
                Author *
              </Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={"my-2"} htmlFor="pdf">
                  PDF File *
                </Label>
                <Input
                  id="pdfUrl"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div>
                <Label className={"my-2"} htmlFor="cover">
                  Cover Image *
                </Label>
                <Input
                  id="coverUrl"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  required
                />
              </div>
            </div>
          </>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsBookSheetOpen(false);
                resetForm();
              }}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isUploading}
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
  );
};
export default BookSheet;

/*  {selectedCategories.merchandise && (
         
        )} */
