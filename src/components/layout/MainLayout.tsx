
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-white border-b">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/f7f14206-cddf-4e42-ae90-dd890baa4856.png" 
            alt="Dr. APJ Abdul Kalam Technical Education Council of Skill Development" 
            className="w-full max-h-36 object-contain my-2"
          />
        </div>
      </div>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
