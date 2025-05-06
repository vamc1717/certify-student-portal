
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole, LoginCredentials } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials, role: UserRole) => Promise<void>;
  logout: () => void;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock user data for demonstration
  const mockUsers = {
    state: {
      id: 'state-1',
      name: 'State Admin',
      email: 'state@example.com',
      role: 'state' as UserRole,
      state: 'Delhi',
    },
    dist: {
      id: 'dist-1',
      name: 'District Coordinator',
      email: 'district@example.com',
      role: 'dist' as UserRole,
      state: 'Delhi',
      district: 'New Delhi',
    },
    college: {
      id: 'college-1',
      name: 'College Admin',
      email: 'college@example.com',
      role: 'college' as UserRole,
      organizationName: 'Delhi Technical College',
      state: 'Delhi',
      district: 'New Delhi',
    },
    student: {
      id: 'student-1',
      name: 'Student User',
      email: 'student@example.com',
      role: 'student' as UserRole,
      registrationNumber: 'STU2023001',
    },
    verification: {
      id: 'verification-1',
      name: 'Verification User',
      email: 'verify@example.com',
      role: 'verification' as UserRole,
      organizationName: 'Acme Corporation',
    },
  };

  const login = async (credentials: LoginCredentials, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if credentials match our mock data
      const mockUser = mockUsers[role];
      
      if (mockUser && mockUser.email === credentials.email) {
        // In a real app, you'd verify password/OTP here
        setUser(mockUser);
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name}`,
        });
        
        // Redirect based on role
        switch (role) {
          case 'state':
            navigate('/state-dashboard');
            break;
          case 'dist':
            navigate('/district-dashboard');
            break;
          case 'college':
            navigate('/college-dashboard');
            break;
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'verification':
            navigate('/verification-dashboard');
            break;
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const sendOtp = async (email: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your email.",
      });
      
      // Changed from returning boolean to void to match interface
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo, we'll consider any 6-digit OTP as valid
      if (otp.length === 6) {
        const mockUser = mockUsers[role];
        if (mockUser && mockUser.email === email) {
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${mockUser.name}`,
          });
          
          // Redirect based on role
          switch (role) {
            case 'state':
              navigate('/state-dashboard');
              break;
            case 'dist':
              navigate('/district-dashboard');
              break;
            case 'college':
              navigate('/college-dashboard');
              break;
            case 'student':
              navigate('/student-dashboard');
              break;
            case 'verification':
              navigate('/verification-dashboard');
              break;
          }
        } else {
          toast({
            title: "Login failed",
            description: "User not found with this email.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid OTP.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        sendOtp, 
        verifyOtp 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
