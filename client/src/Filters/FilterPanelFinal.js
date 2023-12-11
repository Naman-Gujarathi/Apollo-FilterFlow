import React, { useState } from 'react';

const FilterPanel = ({ onFilterChange }) => {
  const [inputValues, setInputValues] = useState({
    location: '',
    jobTitle: '',
    company: '',
  });

  const [searchResults, setSearchResults] = useState([]);

  const [dropdowns, setDropdowns] = useState({
    location: false,
    jobTitle: false,
    company: false,
  });

  // Data for dropdowns
  const locations = ['United States', 'Canada', 'United Kingdom'];
  const jobTitles = ['Engineer', 'Sales Manager', 'Product Manager'];
  const companies = ['Google', 'Amazon', 'Microsoft'];

  const handleInputChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
    onFilterChange(name, value);
  };

  const handleSearch = async () => {
    // Define the API endpoint and your API key
    const API_ENDPOINT = 'https://api.apollo.io/api/v1/mixed_people/search';
    const API_KEY = 'your_api_key_here'; // Use your actual API key

    // Construct the search payload from the inputValues
    const payload = {
      q_organization_domains: inputValues.company ? [`${inputValues.company}.com`] : [],
      organization_locations: inputValues.location ? [inputValues.location] : [],
      person_titles: inputValues.jobTitle ? [inputValues.jobTitle] : [],
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}` // Use Bearer token if needed
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.people); // Update the search results state
      } else {
        throw new Error('Response was not ok.');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const selectDropdownItem = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
    onFilterChange(name, value);
    setDropdowns({ ...dropdowns, [name]: false });
  };

  const toggleDropdown = (name) => {
    setDropdowns({ location: false, jobTitle: false, company: false, [name]: !dropdowns[name] });
  };

  return (
    <div className="filter-panel">
      {/* Input fields and dropdowns */}
      <button onClick={handleSearch}>Search</button>
      {/* Render the search results */}
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="search-result-item">
            <p>{result.name}</p>
            <p>{result.title}</p>
            {/* You can add more details from the result here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
