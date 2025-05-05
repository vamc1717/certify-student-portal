
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/recognition" className="text-gray-300 hover:text-white">Recognition</Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-300 hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/student-portal" className="text-gray-300 hover:text-white">Student Portal</Link>
              </li>
              <li>
                <Link to="/verify-certificate" className="text-gray-300 hover:text-white">Verify Certificate</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Partners</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/training-providers" className="text-gray-300 hover:text-white">Training Providers</Link>
              </li>
              <li>
                <Link to="/course-management" className="text-gray-300 hover:text-white">Course Management</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-gray-400 text-center text-sm">
            Dr. APJ Abdul Kalam Technical Education Council of Skill Development 2017 - 2021 | kh. No 158/1/2 Ground Floor, Samta Vihar Village Mukandpur Near Rajan, New Delhi-110042 © All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
