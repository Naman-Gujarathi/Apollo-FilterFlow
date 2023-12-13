// App.js
import React, { useEffect, useState } from 'react';
import FilterPanel from './Filters/FilterPanel';
import ResultsPanel from './Filters/ResultsPanel';
import { isValidString } from './utilities';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobTitle: '',
    company: '',
    searchQuery: ''
  });
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [dropdowns, setDropdowns] = useState({
    location: false,
    jobTitle: false,
    company: false
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setDropdowns({ ...dropdowns, [key]: false });
  };

  const handleDropdown = (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  // useEffect(() => {
  //   handleSearch();
  // }, [filters]);

  const handleSearch = async () => {

    for (let key of Object.keys(filters)) {
      filters[key] = filters[key].trim()
      if (filters[key].length > 0 && !isValidString(filters[key])) {
        return alert("Invalid characters detected. Only letters, numbers, commas, hyphens and whitespaces allowed")
      }
    }

    const payload = {};

    if (filters.searchQuery) {
      console.log(filters.searchQuery)
      payload.q_keywords = filters.searchQuery.trim();
    }

    if (filters.company.length > 0) {
      console.log(filters.company.length)
      payload.organization_ids = [filters.company.trim()];
    }

    if (filters.location.length > 0) {
      console.log(filters.location.length)
      payload.person_locations = [filters.location.trim()];
    }

    if (filters.jobTitle.length > 0) {
      console.log(filters.jobTitle.length)
      payload.person_titles = [filters.jobTitle.trim()];
    }
    
    // this means no filters were applied
    if (Object.keys(payload).length === 0) {
      setResults([]);
      setTotalCount(0);
      return alert("No filters applied")
    }

    try {
      console.log("*****Inside try********")
      
      const response = await fetch('http://localhost:8000/api/v1', {
        // const response = await fetch('http://ec2-54-87-30-204.compute-1.amazonaws.com:8000/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      setResults(data.people || []);
      setTotalCount(data.pagination.total_entries || 0);
    } catch (error) {
      console.log('Failed to fetch data:', error);
      setResults([]);
      setTotalCount(0);
      if (error.status === 422) {
        alert('Invalid input. Please check your search values.');
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="header-bg p-4  hover:bg-blue-700 text-white text-xl font-semibold shadow">
        Apollo Filter Flow
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="sidebar-bg w-1/4 p-4 overflow-y-auto">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={() => handleSearch()}
            onDropdown={handleDropdown}
            dropdowns={dropdowns}
            setSearchInput={setSearchInput}
          />
        </aside>
        <main className="flex-1 overflow-y-auto p-4">

          <ResultsPanel results={results} totalCount={totalCount} />
        </main>
      </div>
    </div>

  );
};

export default App;
