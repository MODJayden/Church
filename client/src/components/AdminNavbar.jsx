import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, Image, HandCoins, DoorOpen, BookOpen } from "lucide-react";

const AdminNavbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    isActive ? "text-blue-700 font-bold" : "";

  // Define links WITHOUT icons for DESKTOP
  const desktopNavLinks = (
    <>
      <NavLink to="/admin/addgate" className={linkClass}>
        Gate
      </NavLink>
      <NavLink to="/admin/activities" className={linkClass}>
        Activities
      </NavLink>
      <NavLink to="/admin/upload" className={linkClass}>
        Uploads
      </NavLink>
      <NavLink to="/admin/uploadresource" className={linkClass}>
        Resources
      </NavLink>
    </>
  );

  // Define links WITH icons and padding for MOBILE SHEET
  const mobileNavLinks = (
    <>
      <NavLink
        to="/admin/addgate"
        className={({ isActive }) =>
          `${linkClass({
            isActive,
          })} p-2 flex items-center justify-between gap-2 hover:bg-blue-100 transition-colors duration-150 rounded-md`
        }
        onClick={() => setIsSheetOpen(false)}
      >
        Gate
        <DoorOpen size={20} />
      </NavLink>
      <NavLink
        to="/admin/activities"
        className={({ isActive }) =>
          `${linkClass({
            isActive,
          })} p-2 flex items-center gap-2 justify-between hover:bg-blue-100 transition-colors duration-150 rounded-md`
        }
        onClick={() => setIsSheetOpen(false)}
      >
        Activities
        <HandCoins size={20} />
      </NavLink>
      <NavLink
        to="/admin/upload"
        className={({ isActive }) =>
          `${linkClass({
            isActive,
          })} p-2 flex items-center gap-2 justify-between hover:bg-blue-100 transition-colors duration-150 rounded-md`
        }
        onClick={() => setIsSheetOpen(false)}
      >
        Uploads
        <Image size={20} />
      </NavLink>

      <NavLink
        to="/resources"
        className={({ isActive }) =>
          `${linkClass({
            isActive,
          })} p-2 flex items-center gap-2 justify-between hover:bg-blue-100 transition-colors duration-150 rounded-md`
        }
        onClick={() => setIsSheetOpen(false)}
      >
        Resources
        <BookOpen size={20} />
      </NavLink>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl flex justify-between items-center p-4 ">
      <Link to="/admin/addgate" className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-600">Throneroom Int.</h1>
      </Link>
      <ul className="hidden md:flex space-x-4 text-blue-600 items-center">
        {desktopNavLinks}
      </ul>
      <div className="hidden md:block">
        <NavLink to={"/auth/membership"}>
          <Button variant="outline" className="bg-blue-500 text-white">
            Sign Out
          </Button>
        </NavLink>
      </div>
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col">
            <SheetHeader>
              <SheetTitle className=" text-bold text-blue-600 text-center">
                Welcome Beloved
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 py-4 text-blue-600 text-lg flex-grow">
              {mobileNavLinks}
            </div>
            <SheetFooter className="mt-auto pt-4 border-t">
              <NavLink to={"/auth/membership"} onClick={() => setIsSheetOpen(false)}>
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white w-full"
                >
                  Sign Out
                </Button>
              </NavLink>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
export default AdminNavbar;
