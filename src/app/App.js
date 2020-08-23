import React, {} from 'react';
import './App.css';
import ContextWrapper from '../ContextWrapper';
import RouterPaths from './RouterPaths';



function App() {
  
  return (
    <ContextWrapper>
      <RouterPaths />
    </ContextWrapper>
  );
}

export default App;
