
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, LogOut, Plus, QrCode, Users, Pencil, Trash } from "lucide-react";
import { EntityModal } from "@/components/shared/EntityModal";
import {
  initializeLocalStorage,
  getStudents,
  getCourses,
  addItem,
  updateItem,
  deleteItem
} from "@/utils/localStorage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const CollegeDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showQRCode, setShowQRCode] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fields definitions for entity forms
  const studentFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "regNumber", label: "Registration No", type: "text" },
    { name: "course", label: "Course", type: "select", options: courses.map(c => ({ value: c.name, label: c.name })) },
    { name: "attendance", label: "Attendance", type: "text" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Active", label: "Active" },
      { value: "Warning", label: "Warning" },
      { value: "Completed", label: "Completed" }
    ] },
    { name: "completed", label: "Course Completed", type: "select", options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" }
    ] }
  ];

  const courseFields = [
    { name: "name", label: "Course Name", type: "text" },
    { name: "subjects", label: "Subjects", type: "number" },
    { name: "duration", label: "Duration", type: "text" },
  ];

  useEffect(() => {
    // Initialize localStorage with default data if not already present
    initializeLocalStorage();
    
    // Load data from localStorage specific to this college
    loadData();
  }, [user]);

  const loadData = () => {
    if (!user?.organizationName) return;
    
    const loadedStudents = getStudents(user.organizationName);
    const loadedCourses = getCourses(user.organizationName);
    
    setStudents(loadedStudents);
    setCourses(loadedCourses);
  };

  const handleAddStudent = (data: any) => {
    if (!user?.organizationName) return;
    
    addItem('students', {
      ...data, 
      college: user.organizationName,
      completed: data.completed === "true", // Convert string to boolean
    });
    
    // Update college's student count
    const colleges = JSON.parse(localStorage.getItem('colleges') || '[]');
    const collegeIndex = colleges.findIndex((c: any) => c.name === user.organizationName);
    
    if (collegeIndex !== -1) {
      colleges[collegeIndex].students = (colleges[collegeIndex].students || 0) + 1;
      localStorage.setItem('colleges', JSON.stringify(colleges));
    }
    
    loadData();
    toast.success("Student added successfully");
  };

  const handleEditStudent = (data: any) => {
    const updatedData = {
      ...data,
      completed: data.completed === "true"
    };
    updateItem('students', editingItem.id, updatedData);
    loadData();
    setIsEditModalOpen(false);
    toast.success("Student updated successfully");
  };

  const handleDeleteStudent = (id: number) => {
    deleteItem('students', id);
    
    // Update college's student count
    if (user?.organizationName) {
      const colleges = JSON.parse(localStorage.getItem('colleges') || '[]');
      const collegeIndex = colleges.findIndex((c: any) => c.name === user.organizationName);
      
      if (collegeIndex !== -1 && colleges[collegeIndex].students > 0) {
        colleges[collegeIndex].students -= 1;
        localStorage.setItem('colleges', JSON.stringify(colleges));
      }
    }
    
    loadData();
    toast.success("Student deleted successfully");
  };

  const handleAddCourse = (data: any) => {
    if (!user?.organizationName) return;
    
    addItem('courses', {
      ...data,
      college: user.organizationName,
      students: 0
    });
    
    loadData();
    toast.success("Course added successfully");
  };

  const handleEditCourse = (data: any) => {
    updateItem('courses', editingItem.id, data);
    loadData();
    setIsEditModalOpen(false);
    toast.success("Course updated successfully");
  };

  const handleDeleteCourse = (id: number) => {
    deleteItem('courses', id);
    loadData();
    toast.success("Course deleted successfully");
  };

  const openEditModal = (item: any, type: 'student' | 'course') => {
    const editItem = type === 'student' ? {
      ...item,
      completed: item.completed.toString()
    } : item;
    
    setEditingItem({...editItem, type});
    setIsEditModalOpen(true);
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">College / Training Provider Dashboard</h1>
              <p className="text-blue-200">Welcome, {user.organizationName} | {user.district}, {user.state}</p>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="marks">Marks</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Students
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{students.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Updated just now
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Courses
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{courses.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Updated just now
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Attendance Rate
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
                    <div className="text-2xl font-bold">79.3%</div>
                    <p className="text-xs text-muted-foreground">
                      +2.5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Payments
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹52,500</div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2" 
                      onClick={() => setShowQRCode(true)}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Pay Now
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest activities in your institution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="text-sm">New student registered: Anjali Gupta</p>
                      <span className="ml-auto text-xs text-muted-foreground">2d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      <p className="text-sm">Final exams scheduled for Computer Science batch</p>
                      <span className="ml-auto text-xs text-muted-foreground">5d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                      <p className="text-sm">Payment reminder sent to accounts department</p>
                      <span className="ml-auto text-xs text-muted-foreground">1w ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Students</h2>
                <EntityModal
                  title="Add New Student"
                  description="Enter student details below"
                  fields={studentFields}
                  onSave={handleAddStudent}
                  triggerButton={
                    <Button className="bg-blue-800">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                  }
                />
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Registration No</th>
                        <th className="p-4 text-left">Course</th>
                        <th className="p-4 text-center">Attendance</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id} className="border-b">
                          <td className="p-4">{student.name}</td>
                          <td className="p-4">{student.regNumber}</td>
                          <td className="p-4">{student.course}</td>
                          <td className="p-4 text-center">{student.attendance}</td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              student.status === "Active" 
                                ? "bg-green-100 text-green-800" 
                                : student.status === "Completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => openEditModal(student, 'student')}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete this student's data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteStudent(student.id)} className="bg-red-500 text-white">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500">
                            No students found. Add a new student using the button above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Courses</h2>
                <div className="space-x-2">
                  <EntityModal
                    title="Add New Course"
                    description="Enter course details below"
                    fields={courseFields}
                    onSave={handleAddCourse}
                    triggerButton={
                      <Button className="bg-blue-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                      </Button>
                    }
                  />
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Subject
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Course Name</th>
                        <th className="p-4 text-center">Students</th>
                        <th className="p-4 text-center">Subjects</th>
                        <th className="p-4 text-center">Duration</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map(course => (
                        <tr key={course.id} className="border-b">
                          <td className="p-4">{course.name}</td>
                          <td className="p-4 text-center">{
                            students.filter(s => s.course === course.name).length
                          }</td>
                          <td className="p-4 text-center">{course.subjects}</td>
                          <td className="p-4 text-center">{course.duration}</td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => openEditModal(course, 'course')}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete this course and may affect student data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteCourse(course.id)} className="bg-red-500 text-white">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {courses.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            No courses found. Add a new course using the button above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Student Marks</h2>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Enter Student Marks</CardTitle>
                  <CardDescription>
                    Select a course and student to enter or view marks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Select Course</label>
                        <select className="w-full border rounded-md p-2">
                          {courses.map(course => (
                            <option key={course.id} value={course.id}>
                              {course.name}
                            </option>
                          ))}
                          {courses.length === 0 && (
                            <option disabled>No courses available</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Select Subject</label>
                        <select className="w-full border rounded-md p-2">
                          <option>Programming Fundamentals</option>
                          <option>Data Structures</option>
                          <option>Database Management</option>
                          <option>Web Development</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Select Student</label>
                        <select className="w-full border rounded-md p-2">
                          {students.map(student => (
                            <option key={student.id} value={student.id}>
                              {student.name} ({student.regNumber})
                            </option>
                          ))}
                          {students.length === 0 && (
                            <option disabled>No students available</option>
                          )}
                        </select>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Enter Marks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Internal Assessment (40)</label>
                              <input type="number" className="w-full border rounded-md p-2" max="40" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">End Term Exam (60)</label>
                              <input type="number" className="w-full border rounded-md p-2" max="60" />
                            </div>
                          </div>
                          <Button className="w-full">Submit Marks</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Payment Details</h2>
                <Button onClick={() => setShowQRCode(true)}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>
                      Recent payments made by your institution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="p-4 text-left">Date</th>
                          <th className="p-4 text-left">Transaction ID</th>
                          <th className="p-4 text-left">Mode</th>
                          <th className="p-4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">15 Apr 2023</td>
                          <td className="p-4">TRX87654321</td>
                          <td className="p-4">PhonePe</td>
                          <td className="p-4 text-right">₹25,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">28 Mar 2023</td>
                          <td className="p-4">TRX76543210</td>
                          <td className="p-4">Google Pay</td>
                          <td className="p-4 text-right">₹30,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">12 Feb 2023</td>
                          <td className="p-4">TRX65432109</td>
                          <td className="p-4">PhonePe</td>
                          <td className="p-4 text-right">₹15,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Make a Payment</CardTitle>
                    <CardDescription>
                      Enter payment details after scanning QR code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {showQRCode && (
                        <div className="flex justify-center mb-4">
                          <div className="border p-4 bg-white">
                            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                              <QrCode size={120} />
                              <span className="sr-only">QR Code for payment</span>
                            </div>
                            <p className="text-center mt-2 text-sm">Scan to make payment</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Date of Payment</label>
                          <input type="date" className="w-full border rounded-md p-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Time of Payment</label>
                          <input type="time" className="w-full border rounded-md p-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Name/Agent Name</label>
                          <input type="text" className="w-full border rounded-md p-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Paying Person</label>
                          <input type="text" className="w-full border rounded-md p-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Mode of Payment</label>
                          <select className="w-full border rounded-md p-2">
                            <option>PhonePe</option>
                            <option>Google Pay</option>
                            <option>PayTm</option>
                            <option>Bank Transfer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Transaction ID</label>
                          <input type="text" className="w-full border rounded-md p-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Amount</label>
                          <input type="number" className="w-full border rounded-md p-2" />
                        </div>
                      </div>
                      
                      <Button className="w-full">Submit Payment Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Edit modal for students and courses */}
      {editingItem && (
        <EntityModal
          title={`Edit ${editingItem.type === 'student' ? 'Student' : 'Course'}`}
          description={`Update ${editingItem.type === 'student' ? 'student' : 'course'} details`}
          fields={editingItem.type === 'student' ? studentFields : courseFields}
          onSave={editingItem.type === 'student' ? handleEditStudent : handleEditCourse}
          initialData={editingItem}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </MainLayout>
  );
};

export default CollegeDashboard;
