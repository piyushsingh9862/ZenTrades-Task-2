
import React, { useState } from 'react';

const FileUpload = ({ onFileChange }) => {
  const [availableFields, setAvailableFields] = useState([]);

  const uploadFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const fileContent = event.target.result;
          const jsonData = JSON.parse(fileContent);

         
          const columns = jsonData.products ? Object.keys(jsonData.products[Object.keys(jsonData.products)[0]]) : [];
          setAvailableFields(columns);

          onFileChange(jsonData); 
        } catch (error) {
          console.error('Error reading file:', error);
        }
      };

      reader.readAsText(file);
      document.getElementById('fileInfo').innerHTML = '<strong>File Info:</strong><br>' +
        'Name: ' + file.name + '<br>' +
        'Size: ' + file.size + ' bytes<br>' +
        'Type: ' + file.type;
    } else {
      document.getElementById('fileInfo').innerHTML = 'Please select a file.';
    }
  };

  return (
    <div className="half-div" style={{ marginRight: '10px' }}>
      <h2>Step 1: Select File</h2>
      <input type="file" id="fileInput" accept=".csv, .json" onChange={uploadFile} />
      <p style={{ fontSize: '14px' }}>Supported File Type(s): .CSV, .JSON</p>
      <br />
      <div id="fileInfo"></div>
      <div id="availableFields">
        <strong>Available Fields:</strong>
        <ul>
          {availableFields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
