import * as React from 'react';
import LoginSideEffects from './LoginSideEffects';

const AppStateManager = ({children}) => {
  return (
    <>
      <LoginSideEffects>{children}</LoginSideEffects>
    </>
  );
};

export default AppStateManager;
