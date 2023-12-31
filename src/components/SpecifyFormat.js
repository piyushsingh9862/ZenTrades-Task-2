
import React from 'react';

const SpecifyFormat = () => {
  return (
    <div className="half-div" style={{ marginLeft: '10px' }}>
      <h2>Step 2: Specify Format</h2>
      <label htmlFor="formatDropdown">File Format:</label>
      <select id="formatDropdown">
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
      </select>

      <br />
      <br />

      <label htmlFor="encodingDropdown">Character Encoding:</label>
      <select id="encodingDropdown">
        <option value="utf-8">UTF-8</option>
        <option value="utf-16">UTF-16</option>
      </select>

      <br />
      <br />

      <label htmlFor="delimiterDropdown">Delimiter:</label>
      <select id="delimiterDropdown">
        <option value=",">Comma (,)</option>
        <option value=";">Semicolon (;)</option>
        <option value="\t">Tab (\t)</option>
      </select>

      <br />
      <br />

      <input type="checkbox" id="hasHeaderCheckbox" />
      <label htmlFor="hasHeaderCheckbox">File has header</label>
    </div>
  );
};

export default SpecifyFormat;
