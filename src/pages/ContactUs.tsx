
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here in a real application
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We will respond shortly.",
      duration: 5000,
    });
    
    // Clear the form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <MainLayout>
      <div className="page-header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2">Get in touch with our team</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-blue-50">
              <CardContent className="flex flex-col items-center p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Phone className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-gray-700 text-center">+91 123 456 7890</p>
                <p className="text-gray-700 text-center">Monday to Friday, 9am to 5pm</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="flex flex-col items-center p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Mail className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-700 text-center">info@education-portal.org</p>
                <p className="text-gray-700 text-center">support@education-portal.org</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="flex flex-col items-center p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <MapPin className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-700 text-center">123 Education Street,</p>
                <p className="text-gray-700 text-center">Sector 5, Delhi - 110001</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button type="submit" className="px-8">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Location</h2>
              <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Map would be embedded here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactUs;
