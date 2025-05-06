
import React, { useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Eye } from "lucide-react";
import { useReactToPrint } from 'react-to-print';
import { Certificate } from '@/types/certificate';

interface CertificateViewProps {
  certificate: Certificate;
  onClose?: () => void;
  isPreview?: boolean;
}

const CertificateView = ({ certificate, onClose, isPreview = false }: CertificateViewProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: `Certificate-${certificate.id}`,
    content: () => certificateRef.current,
  });

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    // For demo purposes, we'll just trigger the print dialog as a substitute
    handlePrint();
  };

  return (
    <div className="flex flex-col gap-4">
      {!isPreview && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Certificate Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      )}

      <div ref={certificateRef} className="w-full">
        <Card className={`border-8 border-green-500 p-6 ${isPreview ? 'max-w-full' : 'min-w-[800px]'}`}>
          <div className="certificate-content relative">
            {/* Certificate Border Pattern */}
            <div className="absolute inset-0 border-[16px] border-green-100 pointer-events-none" 
                 style={{ 
                   borderImage: 'url("/lovable-uploads/f2811711-9dc4-43c0-9ede-06ab1b186dbd.png") 30 round',
                   borderImageSlice: '30 fill',
                   borderImageWidth: '60px',
                   zIndex: 0
                 }}>
            </div>
            
            <div className="relative z-10 p-8">
              {/* Certificate Header */}
              <div className="text-center mb-8">
                <p className="text-left text-sm font-medium">S.No. : {certificate.serialNumber}</p>
                <h2 className="text-2xl font-bold text-green-600 mt-4">डॉ ए. पी. जे. अब्दुल कलाम तकनीकी शिक्षा - कौशल विकास की परिषद</h2>
                <h1 className="text-4xl font-bold text-green-600 mt-2">Dr. APJ Abdul Kalam Technical Education</h1>
                <h3 className="text-xl text-purple-700 mt-2">Council of Skill Development</h3>
                <p className="text-sm mt-4">The Government of National Capital Territory of Delhi, India & Regd. With MHRD) Recognized by Govt. of India</p>
                <h3 className="text-xl font-bold text-green-600 mt-6">PROVISIONAL CERTIFICATE-CUM-MEMORANDUM OF MARKS</h3>
              </div>

              {/* Student Details */}
              <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
                <p><span className="text-green-600 font-medium">Name:</span> {certificate.studentName}</p>
                <p><span className="text-green-600 font-medium">Father's Name:</span> {certificate.fatherName}</p>
                <p><span className="text-green-600 font-medium">Date of Birth:</span> {certificate.dateOfBirth}</p>
                <p><span className="text-green-600 font-medium">Course:</span> {certificate.course}</p>
                <p><span className="text-green-600 font-medium">Date of Exam:</span> {certificate.examDate}</p>
                <p><span className="text-green-600 font-medium">Regd. No.:</span> {certificate.registrationNumber}</p>
                <p><span className="text-green-600 font-medium">District:</span> {certificate.district}</p>
                <p><span className="text-green-600 font-medium">State:</span> {certificate.state}</p>
              </div>

              {/* Marks Table */}
              <table className="w-full border-collapse border border-green-500 mb-6">
                <thead>
                  <tr>
                    <th className="border border-green-500 p-2 text-left">S.No.</th>
                    <th className="border border-green-500 p-2 text-left">Subject</th>
                    <th className="border border-green-500 p-2 text-center">Maximum Marks</th>
                    <th className="border border-green-500 p-2 text-center">Marks Secured</th>
                  </tr>
                </thead>
                <tbody>
                  {certificate.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="border border-green-500 p-2">{index + 1}.</td>
                      <td className="border border-green-500 p-2">{subject.name}</td>
                      <td className="border border-green-500 p-2 text-center">{subject.maxMarks}</td>
                      <td className="border border-green-500 p-2 text-center">{subject.marksSecured}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="border border-green-500 p-2" colSpan={2}>Grade</td>
                    <td className="border border-green-500 p-2 text-center">Total Marks</td>
                    <td className="border border-green-500 p-2 text-center"></td>
                  </tr>
                  <tr className="font-bold">
                    <td className="border border-green-500 p-2" colSpan={2}>{certificate.grade}</td>
                    <td className="border border-green-500 p-2 text-center">{certificate.totalMaxMarks}</td>
                    <td className="border border-green-500 p-2 text-center">{certificate.totalMarksSecured}</td>
                  </tr>
                </tbody>
              </table>

              {/* Grade Scale */}
              <div className="text-sm mb-6">
                <p>70% to 100% - 'A', 60% - 'B', 50% - 'C', 40% to 49% - 'D'</p>
                <p>This sheet is valid along with the Student Certificate only.</p>
              </div>

              {/* Certificate Footer - Signatures */}
              <div className="flex justify-between mt-16">
                <div className="text-center">
                  <p className="font-medium text-green-600">Center Director</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-green-600">Controller of Examinations</p>
                </div>
              </div>

              {/* Watermark Logo in the Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="h-40 w-40 border-4 border-green-200 rounded-full flex items-center justify-center">
                  <div className="h-36 w-36 border-2 border-green-300 rounded-full"></div>
                </div>
                <div className="absolute h-[300px] w-[300px] border-2 border-green-200 rounded-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-full h-[2px] bg-green-200"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 w-full h-[2px] bg-green-200"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CertificateView;
