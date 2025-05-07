
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, School, Users, Pencil, Trash } from "lucide-react";
import { EntityModal } from "@/components/shared/EntityModal";
import {
  initializeLocalStorage,
  getColleges,
  getStudents,
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

const DistrictDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [colleges, setColleges] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [editingCollege, setEditingCollege] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fields definitions for entity forms
  const collegeFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "district", label: "District", type: "text" },
    { name: "state", label: "State", type: "text" },
  ];

  useEffect(() => {
    // Initialize localStorage with default data if not already present
    initializeLocalStorage();
    
    // Load data from localStorage specific to this district
    loadData();
  }, [user]);

  const loadData = () => {
    if (!user?.district) return;
    
    const loadedColleges = getColleges(user.district);
    const districtStudents: any[] = [];
    
    // Get all students that belong to colleges in this district
    loadedColleges.forEach(college => {
      const collegeStudents = getStudents(college.name);
      districtStudents.push(...collegeStudents);
    });
    
    setColleges(loadedColleges);
    setStudents(districtStudents);
  };

  const handleAddCollege = (data: any) => {
    if (!user?.district || !user?.state) return;
    
    addItem('colleges', {
      ...data, 
      district: user.district, 
      state: user.state,
      students: 0
    });
    
    loadData();
    toast.success("College added successfully");
  };

  const handleEditCollege = (data: any) => {
    updateItem('colleges', editingCollege.id, data);
    loadData();
    setIsEditModalOpen(false);
    toast.success("College updated successfully");
  };

  const handleDeleteCollege = (id: number) => {
    deleteItem('colleges', id);
    loadData();
    toast.success("College deleted successfully");
  };

  const openEditModal = (college: any) => {
    setEditingCollege(college);
    setIsEditModalOpen(true);
  };

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
                    <div className="text-2xl font-bold">{colleges.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Updated just now
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
                    <div className="text-2xl font-bold">{students.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Updated just now
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
                    <div className="text-2xl font-bold">
                      {students.filter(student => student.completed).length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Updated just now
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
                <EntityModal
                  title="Add New College"
                  description="Enter college details below"
                  fields={collegeFields}
                  onSave={handleAddCollege}
                  triggerButton={
                    <Button className="bg-blue-800">
                      <Plus className="mr-2 h-4 w-4" />
                      Add College
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
                        <th className="p-4 text-left">District</th>
                        <th className="p-4 text-left">State</th>
                        <th className="p-4 text-right">Students</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {colleges.map(college => (
                        <tr key={college.id} className="border-b">
                          <td className="p-4">{college.name}</td>
                          <td className="p-4">{college.district}</td>
                          <td className="p-4">{college.state}</td>
                          <td className="p-4 text-right">{college.students}</td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => openEditModal(college)}>
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
                                      This will permanently delete the college and all associated data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteCollege(college.id)} className="bg-red-500 text-white">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {colleges.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            No colleges found. Add a new college using the button above.
                          </td>
                        </tr>
                      )}
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
                      {students.map(student => (
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
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            No students found in this district's colleges.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Edit modal for colleges */}
      {editingCollege && (
        <EntityModal
          title="Edit College"
          description="Update college details"
          fields={collegeFields}
          onSave={handleEditCollege}
          initialData={editingCollege}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </MainLayout>
  );
};

export default DistrictDashboard;
