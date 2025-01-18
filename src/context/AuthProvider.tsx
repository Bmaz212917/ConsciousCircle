import React, {createContext, useState, useContext} from 'react';

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({children}) => {
  const [userRole, setUserRole] = useState(null); // 'admin', 'user', or null
  const [user, setUser] = useState(null); // Store user details if needed

  return (
    <AuthContext.Provider value={{userRole, setUserRole, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
