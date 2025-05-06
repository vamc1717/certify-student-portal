import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, FileText, LogOut, Printer } from "lucide-react";
import CertificateView from "@/components/certificates/CertificateView";
import CertificateModal from "@/components/certificates/CertificateModal";
import { Certificate } from "@/types/certificate";

// Mock data for student results and certificates
const mockResults = [
  { subject: "Programming Fundamentals", internalMarks: 36, externalMarks: 52, totalMarks: 88, grade: "A" },
  { subject: "Data Structures", internalMarks: 34, externalMarks: 48, totalMarks: 82, grade: "B" },
  { subject: "Database Management", internalMarks: 38, externalMarks: 55, totalMarks: 93, grade: "A+" },
  { subject: "Web Development", internalMarks: 33, externalMarks: 50, totalMarks: 83, grade: "B" }
];

// Mock certificate data
const mockCertificate: Certificate = {
  id: "cert-1001",
  serialNumber: "1008/2017",
  studentName: "Rudrapathi Sharma",
  fatherName: "Pasupathi Sharma",
  dateOfBirth: "11-12-1984",
  course: "Diploma in Fire Safety",
  examDate: "15-04-2023",
  registrationNumber: "STU2023001",
  district: "New Delhi",
  state: "Delhi",
  subjects: [
    { name: "Fire Tech & Design", maxMarks: 50, marksSecured: 38 },
    { name: "Construction Safety", maxMarks: 50, marksSecured: 38 },
    { name: "Industrial Safety", maxMarks: 50, marksSecured: 38 },
    { name: "Environmental Safety", maxMarks: 50, marksSecured: 38 }
  ],
  grade: "A",
  totalMaxMarks: 500,
  totalMarksSecured: 391,
  issueDate: "20-04-2023"
};

const mockCertificates = [
  { id: 1, name: "Course Completion Certificate", course: "Computer Science", issueDate: "15 Apr 2023", status: "Issued" },
  { id: 2, name: "Merit Certificate", course: "Database Management", issueDate: "20 Mar 2023", status: "Issued" }
];

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  const openCertificateModal = () => {
    setSelectedCertificate(mockCertificate);
    setIsModalOpen(true);
  };

  const closeCertificateModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCertificate(null), 300); // Clear after animation completes
  };

  return (
    <MainLayout>
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Student Portal</h1>
              <p className="text-blue-200">Welcome, {user.name} | Registration: {user.registrationNumber}</p>
            </div>
            <Button variant="outline" onClick={logout} className="bg-white text-blue-700 hover:bg-gray-100">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:grid-cols-5 grid-cols-2 gap-2 md:gap-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="marksheet">Marksheet</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Course
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M18 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
                      <path d="m2 10 8 5 8-5" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Computer Science</div>
                    <p className="text-xs text-muted-foreground">
                      2021-2023 Batch
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Grade
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">A</div>
                    <p className="text-xs text-muted-foreground">
                      86.5% Overall
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Attendance
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">
                      Good Standing
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest updates from your college
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="text-sm">Final exam results published for Database Management</p>
                      <span className="ml-auto text-xs text-muted-foreground">2d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      <p className="text-sm">Course completion certificate issued</p>
                      <span className="ml-auto text-xs text-muted-foreground">5d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                      <p className="text-sm">Next semester registration opens on June 15th</p>
                      <span className="ml-auto text-xs text-muted-foreground">1w ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Results</CardTitle>
                  <CardDescription>
                    Your performance in various subjects
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Subject</th>
                        <th className="p-4 text-center">Internal (40)</th>
                        <th className="p-4 text-center">External (60)</th>
                        <th className="p-4 text-center">Total (100)</th>
                        <th className="p-4 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockResults.map((result, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4">{result.subject}</td>
                          <td className="p-4 text-center">{result.internalMarks}</td>
                          <td className="p-4 text-center">{result.externalMarks}</td>
                          <td className="p-4 text-center">{result.totalMarks}</td>
                          <td className="p-4 text-center">
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {result.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="p-4 font-medium">Overall Result</td>
                        <td className="p-4 text-center">35.25</td>
                        <td className="p-4 text-center">51.25</td>
                        <td className="p-4 text-center">86.50</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            A
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Download Marksheet
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Certificates</CardTitle>
                  <CardDescription>
                    Certificates issued by your institution
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Certificate</th>
                        <th className="p-4 text-left">Course</th>
                        <th className="p-4 text-center">Issue Date</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCertificates.map(certificate => (
                        <tr key={certificate.id} className="border-b">
                          <td className="p-4">{certificate.name}</td>
                          <td className="p-4">{certificate.course}</td>
                          <td className="p-4 text-center">{certificate.issueDate}</td>
                          <td className="p-4 text-center">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {certificate.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <Button variant="outline" size="sm" onClick={openCertificateModal}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button variant="outline" size="sm" onClick={openCertificateModal}>
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                              <Button variant="outline" size="sm" onClick={openCertificateModal}>
                                <Printer className="h-4 w-4" />
                                <span className="sr-only">Print</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Request Certificate</CardTitle>
                  <CardDescription>
                    Lost your certificate? Request a new one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Certificate Type</label>
                      <select className="w-full border rounded-md p-2">
                        <option>Course Completion Certificate</option>
                        <option>Merit Certificate</option>
                        <option>Attendance Certificate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reason for Request</label>
                      <textarea 
                        className="w-full border rounded-md p-2 min-h-[100px]" 
                        placeholder="Please explain why you need a new certificate..."
                      ></textarea>
                    </div>
                    <Button>Submit Request</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="marksheet" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Marksheet & Certificate</CardTitle>
                  <CardDescription>
                    View, download or print your official marksheet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                      <div>
                        <h3 className="font-medium mb-2">Course: Diploma in Fire Safety</h3>
                        <p className="text-sm text-gray-500">
                          Certificate serial number: {mockCertificate.serialNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          Issued on: {mockCertificate.issueDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={openCertificateModal}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={openCertificateModal}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" onClick={openCertificateModal}>
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 bg-gray-50">
                      <h3 className="font-medium mb-4">Certificate Preview</h3>
                      <CertificateView certificate={mockCertificate} isPreview={true} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Your registered details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Full Name</h3>
                      <p className="mt-1">{user.name}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Registration Number</h3>
                      <p className="mt-1">{user.registrationNumber}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Email Address</h3>
                      <p className="mt-1">{user.email}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Course</h3>
                      <p className="mt-1">Computer Science</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Batch</h3>
                      <p className="mt-1">2021-2023</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Enrollment Status</h3>
                      <p className="mt-1">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Active
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recovery Options</CardTitle>
                  <CardDescription>
                    Lost access to your account?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      If you lose access to your email, you can contact your college administrator or use the form below to request account recovery.
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Alternative Email</label>
                      <input type="email" className="w-full border rounded-md p-2" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Mobile Number</label>
                      <input type="tel" className="w-full border rounded-md p-2" />
                    </div>
                    
                    <Button>Update Recovery Options</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={closeCertificateModal}
      />
    </MainLayout>
  );
};

export default StudentDashboard;
