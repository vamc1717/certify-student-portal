
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, School, ShieldCheck, Building2, Landmark } from "lucide-react";

const Home = () => {
  return (
    <MainLayout>
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dr. APJ Abdul Kalam Technical Education Council
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Enabling Technical Education Excellence
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/about">
              <Button variant="outline" size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                About Us
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button variant="default" size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Access Our Portals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <Landmark className="h-12 w-12 mb-4 text-blue-900" />
              <CardTitle>State Portal</CardTitle>
              <CardDescription>
                For state-level administration and management
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm">
                Manage district coordinators, colleges, and oversee the education system at the state level.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/state-login" className="w-full">
                <Button className="w-full bg-blue-900">
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <Building2 className="h-12 w-12 mb-4 text-blue-800" />
              <CardTitle>District Portal</CardTitle>
              <CardDescription>
                For district coordinators and management
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm">
                Manage colleges in your district, monitor students, and coordinate with state authorities.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/district-login" className="w-full">
                <Button className="w-full bg-blue-800">
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <School className="h-12 w-12 mb-4 text-blue-700" />
              <CardTitle>Training Provider Portal</CardTitle>
              <CardDescription>
                For colleges and training institutions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm">
                Manage students, courses, marks, attendance, and institution-related payments.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/college-login" className="w-full">
                <Button className="w-full bg-blue-700">
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <GraduationCap className="h-12 w-12 mb-4 text-blue-600" />
              <CardTitle>Student Portal</CardTitle>
              <CardDescription>
                For students to access their records
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm">
                View and download marks, certificates, and stay updated with course information.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/student-login" className="w-full">
                <Button className="w-full bg-blue-600">
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <ShieldCheck className="h-12 w-12 mb-4 text-blue-500" />
              <CardTitle>Verification Portal</CardTitle>
              <CardDescription>
                For third-party verification
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm">
                Verify student credentials, certificates, and academic records for recruitment or admission.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/verification-login" className="w-full">
                <Button className="w-full bg-blue-500">
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/verify-certificate">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-2">Certificate Verification</h3>
                <p className="text-gray-600">Verify the authenticity of certificates issued by our council</p>
              </div>
            </Link>
            <Link to="/training-providers">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-2">Training Providers</h3>
                <p className="text-gray-600">Access the training provider portal</p>
              </div>
            </Link>
            <Link to="/student-portal">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-2">Student Portal</h3>
                <p className="text-gray-600">Access student certificates and academic records</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
