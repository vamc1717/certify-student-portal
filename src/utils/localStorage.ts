
// Default mock data
const defaultColleges = [
  { id: 1, name: "Delhi Technical College", district: "North Delhi", state: "Delhi", students: 120 },
  { id: 2, name: "South Delhi Polytechnic", district: "South Delhi", state: "Delhi", students: 85 },
  { id: 3, name: "East Delhi Institute", district: "East Delhi", state: "Delhi", students: 63 }
];

const defaultDistricts = [
  { id: 1, name: "North Delhi", state: "Delhi", colleges: 5, coordinatorName: "Rajesh Kumar", email: "rajesh@example.com" },
  { id: 2, name: "South Delhi", state: "Delhi", colleges: 8, coordinatorName: "Sunita Gupta", email: "sunita@example.com" },
  { id: 3, name: "East Delhi", state: "Delhi", colleges: 3, coordinatorName: "Anand Singh", email: "anand@example.com" }
];

const defaultStudents = [
  { id: 1, name: "Rahul Sharma", regNumber: "STU2023001", college: "Delhi Technical College", course: "Computer Science", attendance: "85%", status: "Active", completed: true },
  { id: 2, name: "Priya Singh", regNumber: "STU2023002", college: "South Delhi Polytechnic", course: "Electronics", attendance: "92%", status: "Active", completed: false },
  { id: 3, name: "Amit Kumar", regNumber: "STU2023003", college: "East Delhi Institute", course: "Mechanical", attendance: "78%", status: "Active", completed: true },
  { id: 4, name: "Anjali Gupta", regNumber: "STU2023004", college: "Delhi Technical College", course: "Civil", attendance: "62%", status: "Warning", completed: true }
];

const defaultCourses = [
  { id: 1, name: "Computer Science", students: 45, subjects: 8, duration: "2 Years", college: "Delhi Technical College" },
  { id: 2, name: "Electronics", students: 32, subjects: 7, duration: "3 Years", college: "South Delhi Polytechnic" },
  { id: 3, name: "Mechanical Engineering", students: 28, subjects: 9, duration: "4 Years", college: "East Delhi Institute" },
  { id: 4, name: "Civil Engineering", students: 20, subjects: 8, duration: "4 Years", college: "Delhi Technical College" }
];

// Initialize localStorage with default data if it doesn't exist
export const initializeLocalStorage = () => {
  if (!localStorage.getItem('colleges')) {
    localStorage.setItem('colleges', JSON.stringify(defaultColleges));
  }
  if (!localStorage.getItem('districts')) {
    localStorage.setItem('districts', JSON.stringify(defaultDistricts));
  }
  if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(defaultStudents));
  }
  if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify(defaultCourses));
  }
};

// Generic CRUD operations
export const getItems = (key: string) => {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

export const addItem = (key: string, item: any) => {
  const items = getItems(key);
  const newId = items.length > 0 ? Math.max(...items.map((i: any) => i.id)) + 1 : 1;
  const newItem = { ...item, id: newId };
  const updatedItems = [...items, newItem];
  localStorage.setItem(key, JSON.stringify(updatedItems));
  return newItem;
};

export const updateItem = (key: string, id: number, updatedItem: any) => {
  const items = getItems(key);
  const updatedItems = items.map((item: any) => 
    item.id === id ? { ...item, ...updatedItem } : item
  );
  localStorage.setItem(key, JSON.stringify(updatedItems));
  return updatedItems.find((item: any) => item.id === id);
};

export const deleteItem = (key: string, id: number) => {
  const items = getItems(key);
  const updatedItems = items.filter((item: any) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updatedItems));
};

// Entity-specific operations
export const getColleges = (district?: string) => {
  const colleges = getItems('colleges');
  return district ? colleges.filter((college: any) => college.district === district) : colleges;
};

export const getDistricts = (state?: string) => {
  const districts = getItems('districts');
  return state ? districts.filter((district: any) => district.state === state) : districts;
};

export const getStudents = (college?: string) => {
  const students = getItems('students');
  return college ? students.filter((student: any) => student.college === college) : students;
};

export const getCourses = (college?: string) => {
  const courses = getItems('courses');
  return college ? courses.filter((course: any) => course.college === college) : courses;
};
