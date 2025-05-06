
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

const DistrictLogin = () => {
  return (
    <MainLayout>
      <div className="page-header bg-gray-100">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold">District Coordinator Login</h1>
          <p className="mt-2">Access the district administration dashboard</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <LoginForm 
          role="dist"
          title="District Coordinator Login"
          description="Enter your credentials to access district coordinator features"
        />
      </div>
    </MainLayout>
  );
};

export default DistrictLogin;
