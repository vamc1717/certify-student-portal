
import MainLayout from "@/components/layout/MainLayout";
import TrainingSector from "@/components/home/TrainingSector";
import { Button } from "@/components/ui/button";
import { 
  Graduation, School, Building, Briefcase, Award, Video, User, Users, Check 
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  // Training sectors with icons
  const sectors = [
    { title: "Education & Teaching", icon: <Graduation />, link: "/courses/education" },
    { title: "Information Technology", icon: <School />, link: "/courses/it" },
    { title: "Healthcare", icon: <Building />, link: "/courses/healthcare" },
    { title: "Business Management", icon: <Briefcase />, link: "/courses/business" },
    { title: "Engineering", icon: <Award />, link: "/courses/engineering" },
    { title: "Media & Design", icon: <Video />, link: "/courses/media" },
    { title: "Professional Development", icon: <User />, link: "/courses/professional" },
    { title: "Language Skills", icon: <Users />, link: "/courses/language" },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              Advance Your Career with Certified Education
            </h1>
            <p className="text-lg mb-8">
              Get industry-recognized certifications and enhance your professional skills with our comprehensive courses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/student-portal">Student Login</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-blue-700">
                <Link to="/training-providers">Provider Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Training Sectors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Training Sectors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {sectors.map((sector) => (
              <TrainingSector 
                key={sector.title}
                title={sector.title}
                icon={sector.icon}
                link={sector.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Platform Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="education-card p-6">
              <div className="text-blue-600 mb-4">
                <Graduation size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Student Portal</h3>
              <p className="text-gray-600">
                Access your courses, download certificates, and track your progress all in one place.
              </p>
            </div>
            
            <div className="education-card p-6">
              <div className="text-blue-600 mb-4">
                <Building size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Training Providers</h3>
              <p className="text-gray-600">
                Manage students, track attendance, and update course materials efficiently.
              </p>
            </div>
            
            <div className="education-card p-6">
              <div className="text-blue-600 mb-4">
                <Check size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Certificate Verification</h3>
              <p className="text-gray-600">
                Verify certificates issued by our platform to ensure authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have advanced their careers through our certified courses.
          </p>
          <Button asChild size="lg">
            <Link to="/verify-certificate">Verify a Certificate</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
