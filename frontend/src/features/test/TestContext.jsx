import React, { createContext } from 'react';
import useTest from './hooks/useTest';

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const testState = useTest();
  return (
    <TestContext.Provider value={testState}>
      {children}
    </TestContext.Provider>
  );
};
