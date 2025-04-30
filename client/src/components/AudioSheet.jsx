import { useEffect, useRef, useState } from "react";
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
import { addSermon, getAllSermons } from "../../store/sermon";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
const AudioSheet = ({ setIsSheetOpen }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [audioFile, setAudioFile] = useState();
  const [uploadedAudioFile, setUploadedAudioFile] = useState(null);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    pastor: "",
    date: "",
    audioUrl: "",
    duration: "",
  });
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    setAudioFile(file);

    try {
      // Create object URL for the audio file
      const audioUrl = URL.createObjectURL(file);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Wait for metadata to load
      await new Promise((resolve) => {
        audio.addEventListener("loadedmetadata", () => {
          resolve();
        });
      });

      // Calculate duration
      const durationInSeconds = audio.duration;
      const formattedDuration = formatDuration(durationInSeconds);

      // Update form state
      setFormData((prev) => ({
        ...prev,
        duration: formattedDuration,
      }));
    } catch (error) {
      console.error("Error calculating duration:", error);
      toast.error("Failed to process audio file");
    }
  };
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioFile) {
      uploadFileToCloudinary();
    }
  }, [audioFile]);

  const uploadFileToCloudinary = async () => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("thumbnail", audioFile);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/book/upload-thumbnail`,
        data,
      
      );
      if (res?.data?.success) {
        setUploadedAudioFile(res?.data?.result?.secure_url);
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
      pastor: "",
      audioUrl: "",
      date: "",
      duration: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedFormData = {
      ...formData,
      audioUrl: uploadedAudioFile,
    };

    setFormData(submittedFormData);
    dispatch(addSermon(formData)).then((res) => {
      if (res?.payload?.success) {
        toast.success("Sermon added successfully");
        setIsSheetOpen(false);
        dispatch(getAllSermons());
        resetForm();
      } else {
        toast.error("Error adding Sermon,try again");
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
              <Label className={"my-2"} htmlFor="preacher">
                Preacher *
              </Label>
              <Input
                id="preacher"
                name="author"
                value={formData.pastor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pastor: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label className={"my-2"} htmlFor="audio">
                Audio File * (MP3)
              </Label>
              <Input
                id="audio"
                type="file"
                accept="audio/mp3"
                onChange={handleFileChange}
                required
              />
            </div>
            <div>
              <Label className={"p-1.5"} htmlFor="date">
                Event Date *
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                required
              />
            </div>
          </>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsSheetOpen(false);
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
export default AudioSheet;
