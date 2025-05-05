
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Recognition = () => {
  // Recognition data
  const recognitionData = [
    { 
      organization: "National Skill Development Corporation (NSDC)", 
      description: "Partnered with NSDC for skill development programs and certification across multiple sectors." 
    },
    { 
      organization: "Ministry of Education", 
      description: "Recognized training provider for various educational programs." 
    },
    { 
      organization: "All India Council for Technical Education (AICTE)", 
      description: "Associated with AICTE for technical education standards and compliance." 
    },
    { 
      organization: "Industry Sector Skill Councils", 
      description: "Collaborating with various Sector Skill Councils to develop industry-relevant curriculum." 
    }
  ];

  // Affiliated colleges data
  const affiliatedColleges = [
    { name: "Advanced Institute of Technology", location: "Delhi", courses: "Technical, Management" },
    { name: "Global Education College", location: "Mumbai", courses: "IT, Business" },
    { name: "Progressive Training Institute", location: "Bangalore", courses: "Healthcare, Education" },
    { name: "Modern Skills Academy", location: "Hyderabad", courses: "Technical, Media" },
    { name: "Future Education Center", location: "Chennai", courses: "Professional Development" }
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Recognition</h1>
          <p className="mt-2">Our Certifications and Affiliations</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Certifications & Recognitions</h2>
              <p className="text-gray-700 mb-6">
                Our educational platform is recognized by various government bodies and 
                industry organizations, ensuring our certifications meet the highest standards
                of quality and relevance in the education sector.
              </p>
              
              <div className="space-y-4">
                {recognitionData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-blue-50">
                    <h3 className="text-lg font-semibold text-blue-700">{item.organization}</h3>
                    <p className="mt-2 text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Industry Partnerships</h2>
              <p className="text-gray-700 mb-4">
                We maintain strong partnerships with leading industry players to ensure our
                training programs remain relevant to current industry demands and practices.
                These collaborations enable our students to gain practical, industry-relevant
                skills that enhance their employability.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
                {/* Industry partner logos - would be replaced with actual logos */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-center justify-center p-4 border rounded-lg">
                    <div className="bg-gray-200 w-full h-20 flex items-center justify-center text-gray-500">
                      Partner Logo {item}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Affiliated Training Centers</h2>
              <p className="text-gray-700 mb-6">
                Our network of affiliated training centers spans across the country,
                providing quality education and certification services in various domains.
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institution Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Course Categories</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliatedColleges.map((college, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{college.name}</TableCell>
                      <TableCell>{college.location}</TableCell>
                      <TableCell>{college.courses}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Recognition;
