import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Loader2, FileAudio, Book, Shirt } from "lucide-react";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import {
  addMerchandiseItem,
  getAllMerchandiseItems,
} from "../../store/merchandiseItemSlice";
import axios from "axios";
const MerchandiseSheet = ({ setIsMerchandiseSheetOpen }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imgthumbnail, setImgthumbnail] = useState();
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: " ",
    price: " ",
    imageUrl: "",
    sizes: ["S", "M", "L", "XL"],
  });

  const handleThumbnailChange = async (e) => {
    const selectedImg = e.target.files?.[0];
    setImgthumbnail(selectedImg);
  };

  const uploadImageToCloudinary = async () => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("thumbnail", imgthumbnail);

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
  const resetForm = () => {
    setFormData({
      name: " ",
      price: " ",
      imageUrl: "",
      sizes: ["S", "M", "L", "XL"],
    });
  };

  useEffect(() => {
    if (imgthumbnail) {
      uploadImageToCloudinary();
    }
  }, [imgthumbnail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedFormData = {
      ...formData,
      imageUrl: uploadedThumbnailUrl,
    };
    setFormData(submittedFormData);

    dispatch(addMerchandiseItem(formData)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getAllMerchandiseItems());
        toast.success("merchandise added successfully");
        resetForm();

        setIsMerchandiseSheetOpen(false);
      } else {
        toast.error("Error adding merchandise,try again");
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
          <>
            {/* Common Fields */}
            <div>
              <Label className={"my-2"} htmlFor="title">
                Name *
              </Label>

              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={"my-2"} htmlFor="price">
                  Price *
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label className={"my-2"} htmlFor="size">
                  Size Options
                </Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.sizes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sizes: e.target.value,
                    })
                  }
                  placeholder="S, M, L, XL"
                />
              </div>
            </div>

            <div>
              <Label className={"my-2"} htmlFor="merch-image">
                Product Image *
              </Label>
              <Input
                id="merch-image"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
              />
            </div>
          </>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsMerchandiseSheetOpen(false);
                resetForm();
              }}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
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
export default MerchandiseSheet;
