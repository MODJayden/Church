import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileAudio, Book, Shirt, Edit, Trash2 } from "lucide-react";
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
import AudioSheet from "@/components/AudioSheet";
import BookSheet from "@/components/BookSheet";
import MerchandiseSheet from "@/components/MerchandiseSheet";
import { useDispatch, useSelector } from "react-redux";
import { getAllMerchandiseItems } from "../../../store/merchandiseItemSlice";
import { getAllSermons } from "../../../store/sermon";
import { getAllBooks } from "../../../store/books";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const UploadResource = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isBookSheetOpen, setIsBookSheetOpen] = useState(false);
  const [isMerchandiseSheetOpen, setIsMerchandiseSheetOpen] = useState(false);
  const { sermons } = useSelector((state) => state.sermon);
  const { books } = useSelector((state) => state.books);
  const { merchandiseItems } = useSelector((state) => state.merchandiseItem);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pdfUrl: "",
    coverUrl: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMerchandiseItems());
    dispatch(getAllSermons());
    dispatch(getAllBooks());
  }, [dispatch]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white py-24 md:py-24">
      <div className="container mx-auto px-4">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Church Resources
          </h1>
          <div className="flex flex-wrap gap-3">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Sermon</span>
                </Button>
              </SheetTrigger>
              <AudioSheet
                handleInputChange={handleInputChange}
                isSheetOpen={isSheetOpen}
                setIsSheetOpen={setIsSheetOpen}
              />
            </Sheet>

            <Sheet open={isBookSheetOpen} onOpenChange={setIsBookSheetOpen}>
              <SheetTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Book</span>
                </Button>
              </SheetTrigger>
              <BookSheet
                handleInputChange={handleInputChange}
                setIsBookSheetOpen={setIsBookSheetOpen}
              />
            </Sheet>

            <Sheet
              open={isMerchandiseSheetOpen}
              onOpenChange={setIsMerchandiseSheetOpen}
            >
              <SheetTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Merchandise</span>
                </Button>
              </SheetTrigger>
              <MerchandiseSheet
                handleInputChange={handleInputChange}
                setIsMerchandiseSheetOpen={setIsMerchandiseSheetOpen}
              />
            </Sheet>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-12">
          {/* Sermons Section */}
          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileAudio className="h-5 w-5 text-blue-500" />
              Sermons
            </h2>
            {sermons?.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600">No sermons uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(sermons) &&
                  sermons?.map((sermon) => (
                    <ResourceCard
                      key={sermon._id}
                      type="sermon"
                      data={sermon}
                      onEdit={() => handleEditSermon(sermon)}
                      onDelete={() => handleDeleteSermon(sermon._id)}
                    />
                  ))}
              </div>
            )}
          </section>

          {/* Books Section */}
          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Book className="h-5 w-5 text-green-500" />
              Books
            </h2>
            {books?.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600">No books uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(books) &&
                  books?.map((book) => (
                    <ResourceCard
                      key={book._id}
                      type="book"
                      data={book}
                      onEdit={() => handleEditBook(book)}
                      onDelete={() => handleDeleteBook(book._id)}
                    />
                  ))}
              </div>
            )}
          </section>

          {/* Merchandise Section */}
          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shirt className="h-5 w-5 text-purple-500" />
              Merchandise
            </h2>
            {merchandiseItems?.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600">
                  No merchandise items uploaded yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(merchandiseItems) &&
                  merchandiseItems?.map((item) => (
                    <ResourceCard
                      key={item._id}
                      type="merchandise"
                      data={item}
                      onEdit={() => handleEditMerchandise(item)}
                      onDelete={() => handleDeleteMerchandise(item._id)}
                    />
                  ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

// Reusable Resource Card Component
const ResourceCard = ({ type, data, onEdit, onDelete }) => {
  const renderContent = () => {
    switch (type) {
      case "sermon":
        return (
          <>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{data.title}</CardTitle>
                <Badge variant="outline" className="text-blue-600">
                  Sermon
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Pastor:</span>
                  {data.pastor}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Date:</span>
                  {format(new Date(data.date), "PPP")}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Duration:</span>
                  {data.duration}
                </p>
              </div>
            </CardContent>
          </>
        );

      case "book":
        return (
          <>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{data.title}</CardTitle>
                <Badge variant="outline" className="text-green-600">
                  Book
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Author:</span>
                  {data.author}
                </p>
                {data.coverUrl && (
                  <div className="mt-3">
                    <img
                      src={data.coverUrl}
                      alt={data.title}
                      className="h-40 w-full object-contain rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </>
        );

      case "merchandise":
        return (
          <>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{data.name}</CardTitle>
                <Badge variant="outline" className="text-purple-600">
                  Merchandise
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Price:</span>
                  {data.price}
                </p>
                {data.sizes?.length > 0 && (
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Sizes:</span>
                    {data.sizes.join(", ")}
                  </p>
                )}
                {data.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="h-40 w-full object-contain rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 group relative">
      {/* Action Buttons (shown on hover) */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {renderContent()}

      <CardFooter className="flex justify-between items-center pt-0">
        <span className="text-xs text-gray-500">
          Added {format(new Date(data.createdAt), "PP")}
        </span>
        {type === "book" && data.pdfUrl && (
          <Button variant="link" size="sm" asChild>
            <a href={data.pdfUrl} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          </Button>
        )}
        {type === "sermon" && data.audioUrl && (
          <Button variant="link" size="sm" asChild>
            <a href={data.audioUrl} target="_blank" rel="noopener noreferrer">
              Listen
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UploadResource;
