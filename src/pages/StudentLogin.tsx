
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

const StudentLogin = () => {
  return (
    <MainLayout>
      <div className="page-header bg-gray-100">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold">Student Login</h1>
          <p className="mt-2">Access your academic records and certificates</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <LoginForm 
          role="student"
          title="Student Login"
          description="Enter your email to receive OTP and access your records"
          requirePassword={false}
          requireOtp={true}
          requireRegistration={true}
        />
      </div>
    </MainLayout>
  );
};

export default StudentLogin;
