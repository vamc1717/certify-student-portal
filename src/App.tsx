
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/training-providers" element={<TrainingProviders />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/course-management" element={<CourseManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
