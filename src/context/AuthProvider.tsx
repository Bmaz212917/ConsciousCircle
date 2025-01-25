import React, {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  const isAdmin = userRole === 'admin';
  const isCoach = userRole === 'coach';
  const isUser = userRole === 'user';

  return (
    <AuthContext.Provider
      value={{userRole, setUserRole, user, setUser, isAdmin, isCoach, isUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
