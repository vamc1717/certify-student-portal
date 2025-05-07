
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
  getDistricts,
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

const StateDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [colleges, setColleges] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fields definitions for entity forms
  const collegeFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "district", label: "District", type: "select", options: districts.map(d => ({ value: d.name, label: d.name })) },
    { name: "state", label: "State", type: "text" },
  ];
  
  const districtFields = [
    { name: "name", label: "District Name", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "coordinatorName", label: "Coordinator Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
  ];

  useEffect(() => {
    // Initialize localStorage with default data if not already present
    initializeLocalStorage();
    
    // Load data from localStorage
    loadData();
  }, []);

  const loadData = () => {
    const loadedColleges = getColleges();
    const loadedDistricts = getDistricts();
    const loadedStudents = getStudents();
    
    setColleges(loadedColleges);
    setDistricts(loadedDistricts);
    setStudents(loadedStudents);
  };

  const handleAddCollege = (data: any) => {
    addItem('colleges', {...data, students: 0});
    loadData();
    toast.success("College added successfully");
  };

  const handleAddDistrict = (data: any) => {
    addItem('districts', {...data, colleges: 0});
    loadData();
    toast.success("District coordinator added successfully");
  };

  const handleEditCollege = (data: any) => {
    updateItem('colleges', editingItem.id, data);
    loadData();
    toast.success("College updated successfully");
  };

  const handleEditDistrict = (data: any) => {
    updateItem('districts', editingItem.id, data);
    loadData();
    toast.success("District updated successfully");
  };

  const handleDeleteCollege = (id: number) => {
    deleteItem('colleges', id);
    loadData();
    toast.success("College deleted successfully");
  };

  const handleDeleteDistrict = (id: number) => {
    deleteItem('districts', id);
    loadData();
    toast.success("District deleted successfully");
  };

  const openEditModal = (item: any, type: 'college' | 'district') => {
    setEditingItem({...item, type});
    setIsEditModalOpen(true);
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">State Admin Dashboard</h1>
              <p className="text-blue-200">Welcome, {user.name} | {user.state}</p>
            </div>
            <Button variant="outline" onClick={logout} className="bg-white text-blue-900 hover:bg-gray-100">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="districts">Districts</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Districts
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
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{districts.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Updated just now
                    </p>
                  </CardContent>
                </Card>
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
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest activities in your state
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="text-sm">New district coordinator added for North Delhi</p>
                      <span className="ml-auto text-xs text-muted-foreground">2d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      <p className="text-sm">3 new colleges registered in South Delhi</p>
                      <span className="ml-auto text-xs text-muted-foreground">5d ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                      <p className="text-sm">Certificate verification request from IBM India</p>
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
                    <Button className="bg-blue-900">
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
                              <Button variant="outline" size="sm" onClick={() => openEditModal(college, 'college')}>
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

            <TabsContent value="districts" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">District Coordinators</h2>
                <EntityModal
                  title="Add District Coordinator"
                  description="Enter district coordinator details"
                  fields={districtFields}
                  onSave={handleAddDistrict}
                  triggerButton={
                    <Button className="bg-blue-900">
                      <Plus className="mr-2 h-4 w-4" />
                      Add District Coordinator
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
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-right">Colleges</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {districts.map(district => (
                        <tr key={district.id} className="border-b">
                          <td className="p-4">{district.coordinatorName}</td>
                          <td className="p-4">{district.name}</td>
                          <td className="p-4">{district.email}</td>
                          <td className="p-4 text-right">{district.colleges}</td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => openEditModal(district, 'district')}>
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
                                      This will permanently delete the district coordinator.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteDistrict(district.id)} className="bg-red-500 text-white">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {districts.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            No districts found. Add a new district coordinator using the button above.
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
                <h2 className="text-xl font-bold">Students who completed courses</h2>
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
                      {students
                        .filter(student => student.completed)
                        .map(student => (
                        <tr key={student.id} className="border-b">
                          <td className="p-4">{student.name}</td>
                          <td className="p-4">{student.college}</td>
                          <td className="p-4">{student.course}</td>
                          <td className="p-4 text-center">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                      {students.filter(student => student.completed).length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            No completed students found.
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

      {/* Edit modal for colleges and districts */}
      {editingItem && (
        <EntityModal
          title={`Edit ${editingItem.type === 'college' ? 'College' : 'District'}`}
          description={`Update ${editingItem.type === 'college' ? 'college' : 'district'} details`}
          fields={editingItem.type === 'college' ? collegeFields : districtFields}
          onSave={editingItem.type === 'college' ? handleEditCollege : handleEditDistrict}
          initialData={editingItem}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </MainLayout>
  );
};

export default StateDashboard;
