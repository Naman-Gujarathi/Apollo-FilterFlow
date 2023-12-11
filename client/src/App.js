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
    setDropdowns({ ...dropdowns, [key]: false });
  };

  const handleDropdown = (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  const handleSearch = async () => {

    const payload = {
      q_organization_domains: filters.company ? filters.company.split(',').map(domain => domain.trim()) : [],
      organization_locations: filters.location ? [filters.location] : [],
      person_titles: filters.jobTitle ? [filters.jobTitle] : [],
    };

    try {
      // const response = await fetch('http://localhost:8000/api/v1', {
        const response = await fetch('http://ec2-54-87-30-204.compute-1.amazonaws.com:8000/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Use the filters state directly
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // setResults(data.results || []); // Use empty array as fallback
      // setTotalCount(data.totalCount || 0); // Use 0 as fallback
      setResults(data.people || []); // Use empty array as fallback
      setTotalCount(data.pagination.total_entries || 0); // Use 0 as fallback
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setResults([]); // Reset to an empty array on error
      setTotalCount(0); // Reset to 0 on error
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-indigo-600  hover:bg-indigo-700 p-3 text-white text-xl">
        Apollo Filter Flow
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
          {/* The filter panel will take the full width on mobile and 1/4th on larger screens */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={() => handleSearch()} // Invoke handleSearch without parameters
            onDropdown={handleDropdown}
            dropdowns={dropdowns}
          />
        </aside>
        <main className="flex-1 overflow-hidden">

          <ResultsPanel results={results} totalCount={totalCount} />
        </main>
      </div>
    </div>

  );
};

export default App;
