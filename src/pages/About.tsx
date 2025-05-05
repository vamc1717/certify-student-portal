
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <MainLayout>
      <div className="page-header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p className="mt-2">Learn more about our educational platform</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                We are dedicated to providing quality education and certification that meets international 
                standards while being accessible to students across different backgrounds and regions.
                Our mission is to empower students with industry-relevant skills and recognized certifications
                that help them advance in their careers.
              </p>
              <p className="text-gray-700">
                Through our platform, we connect students with quality education providers and ensure 
                the certification process maintains high standards of integrity and recognition.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">
                We envision becoming the leading platform for certification management and education
                verification across all sectors of professional training. We strive to create a 
                transparent ecosystem where students, educational providers, and employers can seamlessly
                verify and trust the credentials presented to them.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Quality Assurance</h2>
              <p className="text-gray-700 mb-4">
                We maintain strict quality control over our certification process through:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Rigorous verification of training providers</li>
                <li>Standardized examination procedures</li>
                <li>Multi-level approval process for certification</li>
                <li>Regular auditing of training facilities</li>
                <li>Industry advisory committee oversight</li>
              </ul>
              <p className="text-gray-700">
                Our certifications are recognized by industry partners and educational institutions,
                ensuring that students receive valuable credentials that enhance their career prospects.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our History</h2>
              <p className="text-gray-700 mb-4">
                Established with the goal of standardizing certification processes across various
                educational domains, our platform has grown to serve thousands of students and
                hundreds of training providers nationwide.
              </p>
              <p className="text-gray-700">
                We continue to expand our offerings and improve our technology platform to better
                serve the educational community and maintain the highest standards of certification integrity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
