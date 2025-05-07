
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Recognition from "./pages/Recognition";
import StudentPortal from "./pages/StudentPortal";
import TrainingProviders from "./pages/TrainingProviders";
import VerifyCertificate from "./pages/VerifyCertificate";
import ContactUs from "./pages/ContactUs";
import CourseManagement from "./pages/CourseManagement";
import NotFound from "./pages/NotFound";
import MOU from "./pages/MOU";

// Login Pages
import StateLogin from "./pages/StateLogin";
import DistrictLogin from "./pages/DistrictLogin";
import CollegeLogin from "./pages/CollegeLogin";
import StudentLogin from "./pages/StudentLogin";
import VerificationLogin from "./pages/VerificationLogin";

// Dashboard Pages
import StateDashboard from "./pages/StateDashboard";
import DistrictDashboard from "./pages/DistrictDashboard";
import CollegeDashboard from "./pages/CollegeDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import VerificationDashboard from "./pages/VerificationDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recognition" element={<Recognition />} />
            <Route path="/mou" element={<MOU />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/contact" element={<ContactUs />} /> {/* Added route alias for /contact to resolve 404 */}
            
            {/* Authentication Routes */}
            <Route path="/student-portal" element={<StudentPortal />} />
            <Route path="/training-providers" element={<TrainingProviders />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/course-management" element={<CourseManagement />} />
            
            {/* Login Routes */}
            <Route path="/state-login" element={<StateLogin />} />
            <Route path="/district-login" element={<DistrictLogin />} />
            <Route path="/college-login" element={<CollegeLogin />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/verification-login" element={<VerificationLogin />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/state-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['state']}>
                  <StateDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/district-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['dist']}>
                  <DistrictDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/college-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['college']}>
                  <CollegeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/verification-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['verification']}>
                  <VerificationDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
