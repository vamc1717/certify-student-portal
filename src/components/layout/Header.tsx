
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
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo strip */}
        <div className="flex justify-center border-b py-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">CERTIFY</span>
            <span className="ml-1 text-sm text-gray-500">Education Platform</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium px-3 py-2">
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
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-1">
              <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                About Us
              </Link>
              <Link to="/recognition" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Recognition
              </Link>
              <Link to="/mou" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                MOU
              </Link>
              <Link to="/advisory" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Advisory Committee
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Contact Us
              </Link>
              <Link to="/student-portal" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Student Portal
              </Link>
              <Link to="/training-providers" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Training Providers
              </Link>
              <Link to="/verify-certificate" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Certificate Verification
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/recognition" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Recognition
              </Link>
              <Link 
                to="/mou" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                MOU
              </Link>
              <Link 
                to="/advisory" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Advisory Committee
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                to="/student-portal" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Student Portal
              </Link>
              <Link 
                to="/training-providers" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Training Providers
              </Link>
              <Link 
                to="/verify-certificate" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Certificate Verification
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
