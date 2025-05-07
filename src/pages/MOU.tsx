
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";

// MOU dummy data with alternating layout
const mouData = [
  {
    title: "National Skill Development Corporation",
    description: "The Dr. APJ Abdul Kalam Technical Education Council has signed a Memorandum of Understanding with the National Skill Development Corporation to provide industry-relevant skill training to students across India. This collaboration aims to bridge the gap between education and employability through specialized skill development programs.",
    date: "January 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    imagePosition: "left"
  },
  {
    title: "Microsoft Education Alliance",
    description: "Our partnership with Microsoft Education Alliance focuses on developing digital literacy and cloud computing skills among students. The MOU encompasses curriculum development, faculty training, and certification programs that prepare students for the technology-driven future workplace.",
    date: "February 23, 2024",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    imagePosition: "right"
  },
  {
    title: "Indian Institute of Technology, Delhi",
    description: "The technical education partnership with IIT Delhi enables knowledge exchange, research collaboration, and advanced training opportunities. Students will benefit from joint research projects, specialized workshops, and mentorship from leading academicians and researchers.",
    date: "March 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    imagePosition: "left"
  },
  {
    title: "Amazon Web Services (AWS) Educate",
    description: "This collaboration with AWS Educate provides students access to AWS cloud computing resources, training materials, and certification pathways. The partnership focuses on cloud infrastructure skills development, preparing students for in-demand roles in the technology sector.",
    date: "April 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    imagePosition: "right"
  },
  {
    title: "Confederation of Indian Industry (CII)",
    description: "Through this strategic alliance with CII, we're creating industry-aligned training programs and facilitating industry internships for students. The partnership aims to ensure curriculum relevance and enhance employment opportunities through direct industry connections.",
    date: "May 18, 2024",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    imagePosition: "left"
  },
  {
    title: "IBM Skills Academy",
    description: "The MOU with IBM Skills Academy provides access to cutting-edge technologies including artificial intelligence, blockchain, cybersecurity, and data science. Students receive training on industry-standard platforms and tools, enhancing their employability in emerging technology domains.",
    date: "June 22, 2024",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    imagePosition: "right"
  },
  {
    title: "National Institute of Design",
    description: "Our collaboration with the National Institute of Design integrates design thinking approaches into technical education. This partnership cultivates innovation and creative problem-solving skills among engineering and technical students through specialized workshops and joint projects.",
    date: "July 7, 2024",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    imagePosition: "left"
  },
  {
    title: "Google for Education",
    description: "The partnership with Google for Education provides students access to Google's educational tools, including Google Workspace for Education and Applied Digital Skills curriculum. This collaboration focuses on developing digital literacy and collaborative skills essential in the modern workplace.",
    date: "August 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    imagePosition: "right"
  },
  {
    title: "Cisco Networking Academy",
    description: "Through our MOU with Cisco Networking Academy, students receive industry-standard training in networking technologies, IoT, and cybersecurity. The partnership includes access to Cisco's learning platform, hands-on labs, and globally recognized certification pathways.",
    date: "September 3, 2024",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    imagePosition: "left"
  },
  {
    title: "Entrepreneurship Development Institute of India",
    description: "This collaboration focuses on fostering entrepreneurial mindset and skills among technical students. The MOU includes entrepreneurship development programs, incubation support, and mentorship initiatives to help students transform innovative ideas into viable businesses.",
    date: "October 12, 2024",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    imagePosition: "right"
  },
];

const MOU = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Memorandum of Understanding</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600">
          The Dr. APJ Abdul Kalam Technical Education Council of Skill Development has established strategic partnerships with various institutions and organizations to enhance educational outcomes and employability of students.
        </p>
        
        <div className="space-y-16">
          {mouData.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row">
                {item.imagePosition === "left" && (
                  <div className="md:w-1/2">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover aspect-video md:aspect-auto"
                    />
                  </div>
                )}
                
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="text-sm text-blue-600 mb-2 font-medium">MOU signed on {item.date}</div>
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-6">
                    <a href="#" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                      Read more about this partnership
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                
                {item.imagePosition === "right" && (
                  <div className="md:w-1/2">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover aspect-video md:aspect-auto"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MOU;
