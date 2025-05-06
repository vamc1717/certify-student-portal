
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

const CollegeLogin = () => {
  return (
    <MainLayout>
      <div className="page-header bg-gray-100">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold">College / Training Provider Login</h1>
          <p className="mt-2">Access your institution's management dashboard</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <LoginForm 
          role="college"
          title="College / Training Provider Login"
          description="Enter your credentials to access institution management features"
        />
      </div>
    </MainLayout>
  );
};

export default CollegeLogin;
