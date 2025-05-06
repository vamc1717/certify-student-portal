
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

const StateLogin = () => {
  return (
    <MainLayout>
      <div className="page-header bg-gray-100">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold">State Admin Login</h1>
          <p className="mt-2">Access the state administration dashboard</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <LoginForm 
          role="state"
          title="State Admin Login"
          description="Enter your credentials to access state admin features"
        />
      </div>
    </MainLayout>
  );
};

export default StateLogin;
