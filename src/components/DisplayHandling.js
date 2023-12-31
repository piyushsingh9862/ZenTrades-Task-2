
import './DisplayHandling.css'; //
import React, { useEffect, useState } from 'react';

const DisplayHandling = ({ jsonData }) => {
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [sortedData, setSortedData] = useState([]);


  useEffect(() => {
    if (jsonData && Object.keys(jsonData.products).length > 0) {
      const initialColumns = Object.keys(jsonData.products[Object.keys(jsonData.products)[0]]);
      setColumns(initialColumns);
      setSortedData(sortDataByPopularity(jsonData.products, 'popularity'));
    }
  }, [jsonData]);

  useEffect(() => {
    if (jsonData) {
      const availableFields = Object.keys(jsonData.products[Object.keys(jsonData.products)[0]]);
      setColumns(availableFields);
    }
  }, [jsonData]);

  const sortDataByPopularity = (data, sortBy) => {
    return Object.keys(data).sort((a, b) => data[b][sortBy] - data[a][sortBy]);
  };

  const handleMoveColumn = (direction) => {
    if (columns.length !== 0) {
      if (direction === 'right') {
        var top = columns[0]; 
        setColumns((prevColumns) => prevColumns.filter((column) => column !== top));
        setSelectedColumns((prevSelectedColumns) => [...prevSelectedColumns, top]);
      } else if (direction === 'left') {
        var t = selectedColumns[selectedColumns.length - 1];
        setSelectedColumns((prevSelectedColumns) => prevSelectedColumns.filter((column) => column !== t));
        setColumns((prevColumns) => [...prevColumns, t]);
      }
    }
  };

  const renderTableHeader = () => {
    return (
      <tr>
        {selectedColumns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    );
  };

  const renderTableRows = () => {
    return sortedData.map((productId) => {
      const productData = jsonData.products[productId];
      const filteredData = {};
      selectedColumns.forEach((column) => (filteredData[column] = productData[column]));

      return (
        <tr key={productId}>
          {selectedColumns.map((column) => (
            <td key={column}>{column === 'subcategory' ? capitalizeFirstLetter(filteredData[column]) : filteredData[column]}</td>
          ))}
        </tr>
      );
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.split(/[\s-]+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="full-div">
      <h2>Step 3: Display Handling</h2>

      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <label htmlFor="availableFields">Available Fields:</label>
          <div id="availableFields" className="column-list">
            <ul>
              {columns.map((column, index) => (
                <li key={index}>{column}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
  <button onClick={() => handleMoveColumn('right')}>&gt;&gt;</button>
  <button onClick={() => handleMoveColumn('left')}>&lt;&lt;</button>
</div>

        <div style={{ flex: 1, marginLeft: '10px' }}>
          <label htmlFor="displayedFields">Fields to be Displayed:</label>
          <div id="displayedFields" className="column-list">
            <ul>
              {selectedColumns.map((column, index) => (
                <li key={index}>{column}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="selectedColumnsTable" style={{ textTransform: 'capitalize' }}>
        <table>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayHandling;
