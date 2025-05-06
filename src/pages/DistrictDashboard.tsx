
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, School, Users } from "lucide-react";

// Mock data for colleges and students
const mockColleges = [
  { id: 1, name: "Delhi Technical College", district: "North Delhi", state: "Delhi", students: 120 },
  { id: 2, name: "North Delhi Institute", district: "North Delhi", state: "Delhi", students: 95 },
];

const mockStudents = [
  { id: 1, name: "Rahul Sharma", college: "Delhi Technical College", course: "Computer Science", completed: true },
  { id: 2, name: "Priya Singh", college: "North Delhi Institute", course: "Electronics", completed: false },
  { id: 3, name: "Sunil Kumar", college: "Delhi Technical College", course: "Mechanical", completed: true },
  { id: 4, name: "Meena Kumari", college: "North Delhi Institute", course: "Civil", completed: true }
];

const DistrictDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return null;

  return (
    <MainLayout>
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">District Coordinator Dashboard</h1>
              <p className="text-blue-200">Welcome, {user.name} | {user.district}, {user.state}</p>
            </div>
            <Button variant="outline" onClick={logout} className="bg-white text-blue-800 hover:bg-gray-100">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Colleges
                    </CardTitle>
                    <School className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockColleges.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +1 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Students
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completed Courses
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
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">
                      +1 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest activities in your district
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="text-sm">New college registered: North Delhi Institute</p>
                      <span className="ml-auto text-xs text-muted-foreground">2d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      <p className="text-sm">15 students completed Computer Science course</p>
                      <span className="ml-auto text-xs text-muted-foreground">5d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                      <p className="text-sm">Delhi Technical College added new course: Data Science</p>
                      <span className="ml-auto text-xs text-muted-foreground">1w ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colleges" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Colleges & Training Providers</h2>
                <Button className="bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Add College
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">District</th>
                        <th className="p-4 text-left">State</th>
                        <th className="p-4 text-right">Students</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockColleges.map(college => (
                        <tr key={college.id} className="border-b">
                          <td className="p-4">{college.name}</td>
                          <td className="p-4">{college.district}</td>
                          <td className="p-4">{college.state}</td>
                          <td className="p-4 text-right">{college.students}</td>
                          <td className="p-4 text-center">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Students</h2>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">College</th>
                        <th className="p-4 text-left">Course</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map(student => (
                        <tr key={student.id} className="border-b">
                          <td className="p-4">{student.name}</td>
                          <td className="p-4">{student.college}</td>
                          <td className="p-4">{student.course}</td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              student.completed 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {student.completed ? "Completed" : "In Progress"}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Button variant="outline" size="sm">View</Button>
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

export default DistrictDashboard;
