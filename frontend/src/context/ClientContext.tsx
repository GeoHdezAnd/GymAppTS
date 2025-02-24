"use client"
import React, { createContext, useContext } from "react";

import { CustomerType } from "@/types";

// Create the context with a default value matching the User type
const UserContext = createContext<CustomerType | null>(null);

// Define the UserProvider component
export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: CustomerType;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Create the useUser hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("Cliente no encontrado");
  }
  return context;
};
