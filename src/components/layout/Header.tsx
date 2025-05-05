
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-900 text-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Link to="/" className="text-white hover:text-blue-200 font-medium px-3 py-2">
                Home
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-1">
              <Link to="/about" className="text-white hover:text-blue-200 px-3 py-2">
                About Us
              </Link>
              <Link to="/recognition" className="text-white hover:text-blue-200 px-3 py-2">
                Recognition
              </Link>
              <Link to="/contact-us" className="text-white hover:text-blue-200 px-3 py-2">
                Contact Us
              </Link>
              <Link to="/student-portal" className="text-white hover:text-blue-200 px-3 py-2">
                Student Portal
              </Link>
              <Link to="/training-providers" className="text-white hover:text-blue-200 px-3 py-2">
                Training Providers
              </Link>
              <Link to="/verify-certificate" className="text-white hover:text-blue-200 px-3 py-2">
                Certificate Verification
              </Link>
              <Link to="/course-management" className="text-white hover:text-blue-200 px-3 py-2">
                Course Management
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-blue-800">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/about" 
                className="text-white hover:text-blue-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/recognition" 
                className="text-white hover:text-blue-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Recognition
              </Link>
              <Link 
                to="/contact-us" 
                className="text-white hover:text-blue-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                to="/student-portal" 
                className="text-white hover:text-blue-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Student Portal
              </Link>
              <Link 
                to="/training-providers" 
                className="text-white hover:text-blue-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Training Providers
              </Link>
              <Link 
                to="/verify-certificate" 
                className="text-white hover:text-blue-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Certificate Verification
              </Link>
              <Link 
                to="/course-management" 
                className="text-white hover:text-blue-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Course Management
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
