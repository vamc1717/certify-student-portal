
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

const VerificationLogin = () => {
  return (
    <MainLayout>
      <div className="page-header bg-gray-100">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold">Certificate Verification Portal</h1>
          <p className="mt-2">Third-party verification of student credentials</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <LoginForm 
          role="verification"
          title="Verification Portal Login"
          description="Enter your email to access the verification portal"
          requirePassword={true}
          requireOtp={false}
        />
      </div>
    </MainLayout>
  );
};

export default VerificationLogin;
