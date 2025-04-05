import { createContext, useState , useContext , useEffect } from "react";
import {jwtDecode} from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const storedUser = localStorage.getItem("token");
       if(storedUser) {
          const decodedUser = jwtDecode(storedUser);
          setUser( decodedUser.role);
        }
        setLoading(false);
    }, []);
    const loginUser = (token) => {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded); // triggers re-render
      setLoading(false);
    };
    const logoutUser = () => {
      localStorage.removeItem('token');
      setUser("guest")
      setLoading(false);
    }
    return (
      <AuthContext.Provider value={{ user, setUser,loginUser , logoutUser , loading}}>
        {children}
      </AuthContext.Provider>
    );
  };
  
export const useAuth = () => useContext(AuthContext);
