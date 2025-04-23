import { Button } from "@/components/ui/button";
import { Download, ShoppingCart, Headphones, Book } from "lucide-react";

// Sample data - replace with your actual content
const sermons = [
  {
    id: 1,
    title: "The Power of Faith",
    date: "June 5, 2023",
    pastor: "Apostle Erick Ampah",
    audioUrl: "/audio/power-of-faith.mp3",
    duration: "45:22"
  },
  {
    id: 2,
    title: "Walking in Victory",
    date: "May 29, 2023",
    pastor: "Apostle Erick Ampah",
    audioUrl: "/audio/walking-in-victory.mp3",
    duration: "38:15"
  },
  {
    id: 3,
    title: "Kingdom Principles",
    date: "May 22, 2023",
    pastor: "Pastor Duke Quansah",
    audioUrl: "/audio/kingdom-principles.mp3",
    duration: "52:40"
  }
];

const books = [
  {
    id: 1,
    title: "The Throne Room Experience",
    author: "Apostle Erick Ampah",
    coverUrl: "/books/throne-room-experience.jpg",
    pdfUrl: "/books/throne-room-experience.pdf"
  },
  {
    id: 2,
    title: "Daily Devotions for Victory",
    author: "Apostle Erick Ampah",
    coverUrl: "/books/daily-devotions.jpg",
    pdfUrl: "/books/daily-devotions.pdf"
  },
  {
    id: 3,
    title: "Understanding Spiritual Warfare",
    author: "Apostle Erick Ampah",
    coverUrl: "/books/spiritual-warfare.jpg",
    pdfUrl: "/books/spiritual-warfare.pdf"
  }
];

const merchandise = [
  {
    id: 1,
    name: "Throneroom T-Shirt",
    price: "₵50.00",
    imageUrl: "/merch/tshirt-1.jpg",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Prayer Warrior Hoodie",
    price: "₵80.00",
    imageUrl: "/merch/hoodie-1.jpg",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 3,
    name: "Church Wristband",
    price: "₵10.00",
    imageUrl: "/merch/wristband-1.jpg",
    colors: ["Red", "Blue", "Black"]
  }
];

const Resources = () => {
  const handleDownload = (url) => {
    // In a real app, this would trigger the download
    console.log("Downloading:", url);
    // Simulate download
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">Church Resources</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access sermons, books, and merchandise to support your spiritual journey
          </p>
        </div>

        {/* Sermons Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Sermons</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <div key={sermon.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{sermon.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600"><span className="font-medium">Date:</span> {sermon.date}</p>
                    <p className="text-gray-600"><span className="font-medium">Preacher:</span> {sermon.pastor}</p>
                    <p className="text-gray-600"><span className="font-medium">Duration:</span> {sermon.duration}</p>
                  </div>
                  <Button 
                    onClick={() => handleDownload(sermon.audioUrl)}
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
            <h2 className="text-2xl font-bold text-gray-800">Books & Publications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400?text=Book+Cover";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h3>
                  <p className="text-gray-600 mb-4">by {book.author}</p>
                  <Button 
                    onClick={() => handleDownload(book.pdfUrl)}
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
            <h2 className="text-2xl font-bold text-gray-800">Church Merchandise</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchandise.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x500?text=Product+Image";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-lg font-medium text-blue-600 mb-3">{item.price}</p>
                  {item.sizes && (
                    <p className="text-gray-600 mb-2"><span className="font-medium">Sizes:</span> {item.sizes.join(", ")}</p>
                  )}
                  {item.colors && (
                    <p className="text-gray-600 mb-4"><span className="font-medium">Colors:</span> {item.colors.join(", ")}</p>
                  )}
                  <Button 
                    onClick={() => handlePurchase(item)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
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