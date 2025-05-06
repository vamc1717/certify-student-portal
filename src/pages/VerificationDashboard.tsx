
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, LogOut, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock student data for verification
const mockStudentData = {
  name: "Rahul Sharma",
  registrationNumber: "STU2023001",
  course: "Computer Science",
  college: "Delhi Technical College",
  passingYear: "2023",
  grade: "A",
  percentage: "86.5%",
  certificateNumber: "CERT2023001",
};

const VerificationDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("verify");
  const [studentName, setStudentName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [requestorName, setRequestorName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationHistory, setVerificationHistory] = useState([
    { id: 1, studentName: "Priya Singh", regNumber: "STU2023002", requestorName: "John Smith", organization: "ABC Corp", date: "24 Apr 2023" },
    { id: 2, studentName: "Amit Kumar", regNumber: "STU2023003", requestorName: "John Smith", organization: "ABC Corp", date: "18 Mar 2023" }
  ]);

  if (!user) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      if (studentName.toLowerCase() === "rahul sharma" && regNumber === "STU2023001") {
        setOtpSent(true);
        toast({
          title: "OTP Sent",
          description: "A verification code has been sent to your email.",
        });
      } else {
        toast({
          title: "No Records Found",
          description: "We couldn't find any student matching these details.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      if (otp.length === 6) {
        setShowResults(true);
        setOtpSent(false);
        
        // Add to verification history
        setVerificationHistory(prev => [
          {
            id: prev.length + 1,
            studentName,
            regNumber,
            requestorName,
            organization,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          },
          ...prev
        ]);
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid 6-digit OTP.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const resetSearch = () => {
    setStudentName("");
    setRegNumber("");
    setRequestorName("");
    setOrganization("");
    setEmail("");
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setShowResults(false);
  };

  return (
    <MainLayout>
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Verification Portal</h1>
              <p className="text-blue-200">Welcome, {user.name} | {user.organizationName}</p>
            </div>
            <Button variant="outline" onClick={logout} className="bg-white text-blue-900 hover:bg-gray-100">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="verify" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verify">Verify Certificate</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="verify" className="space-y-4">
              {!showResults ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Certificate Verification</CardTitle>
                    <CardDescription>
                      Enter student details to verify their certificate
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {!otpSent ? (
                      <form onSubmit={handleSearch}>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Student Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="studentName">Student Name</Label>
                                <Input
                                  id="studentName"
                                  placeholder="Enter student's name"
                                  value={studentName}
                                  onChange={(e) => setStudentName(e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="regNumber">Registration Number</Label>
                                <Input
                                  id="regNumber"
                                  placeholder="Enter registration number"
                                  value={regNumber}
                                  onChange={(e) => setRegNumber(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Requestor Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="requestorName">Your Name</Label>
                                <Input
                                  id="requestorName"
                                  placeholder="Enter your name"
                                  value={requestorName}
                                  onChange={(e) => setRequestorName(e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="organization">Organization</Label>
                                <Input
                                  id="organization"
                                  placeholder="Enter your organization"
                                  value={organization}
                                  onChange={(e) => setOrganization(e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="Enter your email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  placeholder="Enter your phone number"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          
                          <Button type="submit" className="w-full" disabled={isSearching}>
                            {isSearching ? "Searching..." : "Search & Get OTP"}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input
                              id="otp"
                              placeholder="Enter the verification code"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              required
                            />
                            <p className="text-sm text-gray-500">
                              A verification code has been sent to your email ({email})
                            </p>
                          </div>
                          
                          <Button type="submit" className="w-full" disabled={isSearching}>
                            {isSearching ? "Verifying..." : "Verify Certificate"}
                          </Button>
                          
                          <Button 
                            type="button" 
                            variant="link" 
                            className="w-full"
                            onClick={() => setOtpSent(false)}
                          >
                            Back to Search Form
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Certificate Verification Result</CardTitle>
                          <CardDescription>
                            Student Certificate Details
                          </CardDescription>
                        </div>
                        <Button variant="outline" onClick={resetSearch}>
                          New Search
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        <div className="border-b pb-4">
                          <h3 className="text-lg font-medium mb-4">Student Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Student Name</h4>
                              <p className="mt-1">{mockStudentData.name}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Registration Number</h4>
                              <p className="mt-1">{mockStudentData.registrationNumber}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Course</h4>
                              <p className="mt-1">{mockStudentData.course}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Institution</h4>
                              <p className="mt-1">{mockStudentData.college}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Certificate Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Certificate Number</h4>
                              <p className="mt-1">{mockStudentData.certificateNumber}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Year of Passing</h4>
                              <p className="mt-1">{mockStudentData.passingYear}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Grade</h4>
                              <p className="mt-1">{mockStudentData.grade}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Percentage</h4>
                              <p className="mt-1">{mockStudentData.percentage}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4">
                      <div className="w-full flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-green-700 font-medium">Verified</span>
                        </span>
                        <span className="text-sm text-gray-500">
                          Verification Date: {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <div className="flex justify-center">
                    <p className="text-sm text-gray-500 italic">
                      Note: As a third-party verifier, you can only view certificate details but cannot download them.
                    </p>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Verification History</CardTitle>
                  <CardDescription>
                    Records of certificates you have verified
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Student Name</th>
                        <th className="p-4 text-left">Registration No</th>
                        <th className="p-4 text-left">Requestor</th>
                        <th className="p-4 text-left">Organization</th>
                        <th className="p-4 text-center">Date</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verificationHistory.map(record => (
                        <tr key={record.id} className="border-b">
                          <td className="p-4">{record.studentName}</td>
                          <td className="p-4">{record.regNumber}</td>
                          <td className="p-4">{record.requestorName}</td>
                          <td className="p-4">{record.organization}</td>
                          <td className="p-4 text-center">{record.date}</td>
                          <td className="p-4 text-center">
                            <Button variant="outline" size="sm">
                              <Search className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default VerificationDashboard;
