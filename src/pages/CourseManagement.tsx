
import MainLayout from "@/components/layout/MainLayout";
import CourseFileUpload from "@/components/courses/CourseFileUpload";

const CourseManagement = () => {
  return (
    <MainLayout>
      <div className="page-header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="mt-2">Upload and manage course data</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <CourseFileUpload />
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseManagement;
