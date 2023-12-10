// App.js
import React, { useState } from 'react';
import FilterPanel from './Filters/FilterPanel';
import ResultsPanel from './Filters/ResultsPanel';


const App = () => {
  const [filters, setFilters] = useState({
    location: '',
    jobTitle: '',
    company: '',
  });
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [dropdowns, setDropdowns] = useState({
    location: false,
    jobTitle: false,
    company: false,
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    // Hide the dropdown after selection
    setDropdowns({ ...dropdowns, [key]: false });
  };

  const handleDropdown = (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  const handleSearch = async () => {
    // Replace with actual data fetching logic
    const mockResults = [
      {
        name: 'John Doe',
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        quickActions: 'Email, Call',
        // ...other properties
      },
      {
        name: 'Jane Smith',
        title: 'Product Manager',
        company: 'Innovatech',
        location: 'New York, NY',
        quickActions: 'Email, Call',
        // ...other properties
      },
      // ...more mock data
    ]; // your mock results here
    setResults(mockResults);
    setTotalCount(mockResults.length);
  };

  return (
    <div className="app">
      <FilterPanel
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onDropdown={handleDropdown}
        dropdowns={dropdowns}
      />
      <ResultsPanel results={results} totalCount={totalCount} />
    </div>
  );
};

export default App;
