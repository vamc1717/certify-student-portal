
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface Course {
  id: string;
  courseCode: string;
  title: string;
  duration: string;
  qualification: string;
  sector?: string;
}

const CourseFileUpload = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csvData = event.target?.result as string;
          const parsedData = parseCSV(csvData);
          setCourses(parsedData);
          toast({
            title: "File Uploaded Successfully",
            description: `${parsedData.length} courses have been loaded.`,
            duration: 3000,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Could not process the file. Please check the format and try again.",
            variant: "destructive",
            duration: 3000,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  // Simple CSV parser
  const parseCSV = (csvData: string): Course[] => {
    const lines = csvData.split("\n");
    if (lines.length <= 1) {
      throw new Error("No data in file");
    }
    
    // Skip header row
    const parsedData = lines.slice(1)
      .filter(line => line.trim() !== "")
      .map((line, index) => {
        const values = line.split(",").map(val => val.trim());
        if (values.length < 4) {
          throw new Error("Invalid data format");
        }
        
        return {
          id: `course-${index}`,
          courseCode: values[0],
          title: values[1],
          duration: values[2],
          qualification: values[3],
          sector: values[4] || "General"
        };
      });
      
    return parsedData;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upload Course Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600">
              Upload your course data in CSV format with the following columns:
              <br />
              Course Code, Title, Duration, Qualification, Sector (optional)
            </p>
            
            <div className="flex items-center justify-center w-full">
              <label htmlFor="course-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-500 mb-2" />
                  <p className="mb-1 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">CSV files only</p>
                </div>
                <Input 
                  id="course-file" 
                  type="file" 
                  accept=".csv"
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            
            <Button 
              onClick={() => {
                const input = document.getElementById('course-file') as HTMLInputElement;
                input.click();
              }}
            >
              Select File
            </Button>
          </div>
        </CardContent>
      </Card>

      {courses.length > 0 && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Uploaded Course Data</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Sector</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.courseCode}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.qualification}</TableCell>
                    <TableCell>{course.sector}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseFileUpload;
