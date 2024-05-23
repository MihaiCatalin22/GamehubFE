import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../components/services/UserService';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

const updateAxiosToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
const TokenManager = {
  getAccessToken: () => sessionStorage.getItem("accessToken"),
  setAccessToken: (token) => {
      sessionStorage.setItem("accessToken", token);
      const claims = jwtDecode(token);
      sessionStorage.setItem("claims", JSON.stringify(claims));
      return claims;
  },
  clear: () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("claims");
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = TokenManager.getAccessToken();
    const storedUserData = sessionStorage.getItem('user');
    if (storedUserData && storedToken) {
      const userData = JSON.parse(storedUserData);
      setIsAuthenticated(true);
      setUser(userData);
      updateAxiosToken(storedToken);
    }
  }, []);

  const loginUser = async (userData) => {
    const claims = TokenManager.setAccessToken(userData.token);
    const updatedUserData = {
      ...userData,
      roles: claims.roles || [],
    };
    sessionStorage.setItem('user', JSON.stringify(updatedUserData));
    setIsAuthenticated(true);
    setUser(updatedUserData);
    updateAxiosToken(userData.token);
  };

  const logoutUser = () => {
    TokenManager.clear();
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    updateAxiosToken(null);
  };

  const updateUserDetails = async (userData) => {
    try {
      const response = await userService.updateUser(userData.id, userData);
      const updatedUser = { ...userData, ...response.data, token: response.data.jwt || userData.token };
      TokenManager.setAccessToken(updatedUser.token);
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      updateAxiosToken(updatedUser.token);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const hasRole = (rolesRequired) => {
    if (!Array.isArray(rolesRequired)) {
      rolesRequired = [rolesRequired];
    }
    const userRoles = user?.roles || [];
    return rolesRequired.some(role => userRoles.includes(role));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, loginUser, logoutUser, updateUserDetails, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) {
  throw new Error('useAuth must be used within an AuthProvider');
}
return context;
};