import { createContext, useState, useContext } from 'react';

const RequestCountContext = createContext();

export function RequestCountProvider({ children }) {
  const [requestCount, setRequestCount] = useState(0);
  
  return (
    <RequestCountContext.Provider value={{ requestCount, setRequestCount }}>
      {children}
    </RequestCountContext.Provider>
  );
}

export function useRequestCount() {
  const context = useContext(RequestCountContext);
  if (!context) {
    throw new Error('useRequestCount must be used within a RequestCountProvider');
  }
  return context;
}