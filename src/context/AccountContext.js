import React, { createContext, useState, useEffect } from "react";

// Create the context
const AccountContext = createContext({
  isAuthenticated: false,
  login: () => Promise.resolve(), // Placeholder login function
  logout: () => Promise.resolve(), // Placeholder logout function
  setIsAuthenticated: () => {},   // Placeholder for updating authentication status
});

export const AccountProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock functions for login and logout (replace with your actual API calls)
  const login = async (email, password) => {
    try {
      // Call your login API here
      // Example: const response = await apiLogin(email, password);
      // On successful login:
      setIsAuthenticated(true);
      console.log("Admin logged in successfully");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call your logout API here
      // Example: await apiLogout();
      setIsAuthenticated(false);
      console.log("Admin logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  // Persist login state (optional, e.g., check token/session storage)
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(isAdminLoggedIn);
  }, []);

  // Save authentication state in localStorage for persistence (optional)
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setIsAuthenticated, // Expose this in case manual updates are needed
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
