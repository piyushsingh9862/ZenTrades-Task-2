import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import SpecifyFormat from './components/SpecifyFormat';
import DisplayHandling from './components/DisplayHandling';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (json) => {
    setJsonData(json);
  };

  return (
    <div className="body">
      <div className="container">
        <FileUpload onFileChange={handleFileChange} />
        <SpecifyFormat />
      </div>
      <DisplayHandling jsonData={jsonData} />
    </div>
  );
}

export default App;

