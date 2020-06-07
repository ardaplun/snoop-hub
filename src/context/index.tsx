import React from 'react';
import UserContextProcider from './userContext';
import RepoContextProvider from './repoContext';

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <UserContextProcider>
      <RepoContextProvider>{children}</RepoContextProvider>
    </UserContextProcider>
  );
};

export default ContextProvider;
