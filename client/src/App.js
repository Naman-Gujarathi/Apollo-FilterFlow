// App.js
import React, { useState } from 'react';
import FilterPanel from './Components/Filters/FilterPanel';
import ResultsPanel from './Components/Filters/ResultsPanel';
import { handleSearch } from './Components/SearchService';


const App = () => {
  // State management for user inputs and search results
  const [userQuery, setUserQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobTitle: '',
    company: '',
    searchQuery: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [totalResultsCount, setTotalResultsCount] = useState(0);
  const [dropdowns, setDropdowns] = useState({
    location: false,
    jobTitle: false,
    company: false
  });

  // Update filters upon user input
  const onFilterUpdate = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setDropdowns({ ...dropdowns, [key]: false });
  };

  // Toggle visibility of dropdown menus
  const toggleDropdownVisibility = (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  // Perform search based on current filters
  const executeSearch = async () => {
    handleSearch(filters, setSearchResults, setTotalResultsCount)
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
            onFilterChange={onFilterUpdate}
            onSearch={() => executeSearch()}
            onDropdown={toggleDropdownVisibility}
            dropdowns={dropdowns}
            setUserQuery={setUserQuery}
          />
        </aside>
        <main className="flex-1 overflow-y-auto p-4">

          <ResultsPanel searchResults={searchResults} totalResultsCount={totalResultsCount} />
        </main>
      </div>
    </div>

  );
};

export default App;
