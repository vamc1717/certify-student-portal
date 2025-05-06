
export interface CertificateSubject {
  name: string;
  maxMarks: number;
  marksSecured: number;
}

export interface Certificate {
  id: string;
  serialNumber: string;
  studentName: string;
  fatherName: string;
  dateOfBirth: string;
  course: string;
  examDate: string;
  registrationNumber: string;
  district: string;
  state: string;
  subjects: CertificateSubject[];
  grade: string;
  totalMaxMarks: number;
  totalMarksSecured: number;
  issueDate: string;
}
