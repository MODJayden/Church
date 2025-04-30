import { Button } from "@/components/ui/button";
import { Download, ShoppingCart, Headphones, Book } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../../store/books";
import { getAllMerchandiseItems } from "../../../store/merchandiseItemSlice";
import { getAllSermons } from "../../../store/sermon";


const Resources = () => {
  const { sermons } = useSelector((state) => state.sermon);
  const { books } = useSelector((state) => state.books);
  const { merchandiseItems } = useSelector((state) => state.merchandiseItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMerchandiseItems());
    dispatch(getAllSermons());
    dispatch(getAllBooks());
  }, [dispatch]);
  const handleDownloadSermon = async (sermon) => {
    try {
      const response = await fetch(sermon.audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const fileName = sermon.title;
      const blob = new Blob([arrayBuffer], {
        type: response.headers.get("Content-Type"),
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error(`Error occurred while downloading file: ${error.message}`);
    }
  };
  const handleDownload = async (book) => {
    try {
      const response = await fetch(book.pdfUrl);
      const arrayBuffer = await response.arrayBuffer();
      const fileName = book.title;
      const blob = new Blob([arrayBuffer], {
        type: response.headers.get("Content-Type"),
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error(`Error occurred while downloading file: ${error.message}`);
    }
  };

  const handlePurchase = (item) => {
    // In a real app, this would add to cart or redirect to checkout
    console.log("Purchasing:", item);
    alert(`Added ${item.name} to cart`);
  };

  return (
    <section className="bg-white py-18 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
            Church Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access sermons, books, and merchandise to support your spiritual
            journey
          </p>
        </div>

        {/* Sermons Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Sermons</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(sermons) && sermons?.map((sermon) => (
              <div
                key={sermon._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {sermon.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Date:</span> {sermon.date}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Preacher:</span>{" "}
                      {sermon.pastor}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Duration:</span>{" "}
                      {sermon.duration}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDownloadSermon(sermon)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Sermon
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Books Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Book className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Books & Publications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(books) && books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                   
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {book.author}</p>
                  <Button
                    onClick={() => handleDownload(book)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Merchandise Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Church Merchandise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(merchandiseItems) && merchandiseItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                   
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-lg font-medium text-blue-600 mb-3">
                  GH₵{item.price}
                  </p>
                  {item.sizes && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Sizes:</span>{" "}
                      {item.sizes.join(", ")}
                    </p>
                  )}
                  {item.colors && (
                    <p className="text-gray-600 mb-4">
                      <span className="font-medium">Colors:</span>{" "}
                      {item.colors.join(", ")}
                    </p>
                  )}
                  <Button
                    onClick={() => handlePurchase(item)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
