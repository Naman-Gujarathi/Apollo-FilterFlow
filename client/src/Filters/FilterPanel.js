import React, { useState, useEffect, useRef } from 'react';

const FilterPanel = ({ onFilterChange, onSearch }) => {
  const [inputValues, setInputValues] = useState({
    location: '',
    jobTitle: '',
    company: '',
  });

  const locations = ['Mountain View, US', 'Canada', 'United Kingdom'];
  const jobTitles = ['Engineer', 'Sales Manager', 'Product Manager'];
  const companies = ['Google', 'Amazon', 'Microsoft'];

  const [dropdowns, setDropdowns] = useState({
    location: false,
    jobTitle: false,
    company: false,
  });

  const filterPanelRef = useRef();

  

  

  useEffect(() => {


    const closeAllDropdowns = () => {
        setDropdowns({
          location: false,
          jobTitle: false,
          company: false,
        });
      };

    const handleOutsideClick = (event) => {
        if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
          closeAllDropdowns();
        }
      };
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this effect only runs on mount and unmount

  // Data for dropdowns
  

  const handleInputChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
    onFilterChange(name, value);
  };

//   const handleSearch = (filters) => {
//     // Here you would implement your search logic using the filters
//     // For example, you might call an API or filter data already in your state
//     console.log('Searching with filters:', filters);
//     // Then, you update your state with the results
//     // setSearchResults(updatedResults);
//   };

  const selectDropdownItem = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
    onFilterChange(name, value);
    setDropdowns({ ...dropdowns, [name]: false });
  };

  const toggleDropdown = (name) => {
    setDropdowns({ location: false, jobTitle: false, company: false, [name]: !dropdowns[name] });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValues);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-6" ref={filterPanelRef}>
      {/* Location input */}
      <div className="relative">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location:
        </label>
        <input
          id="location"
          type="text"
          value={inputValues.location}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => handleInputChange('location', e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => toggleDropdown('location')}
        />
        {dropdowns.location && (
          <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {locations.map((location, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => selectDropdownItem('location', location)}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative w-full">
  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
    Job Title:
  </label>
  <input
    id="jobTitle"
    type="text"
    value={inputValues.jobTitle}
    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
    onKeyPress={handleKeyPress}
    onFocus={() => toggleDropdown('jobTitle')}
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
  {dropdowns.jobTitle && (
    <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full">
      {jobTitles.map((title, index) => (
        <div
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => selectDropdownItem('jobTitle', title)}
        >
          {title}
        </div>
      ))}
    </div>
  )}
</div>

{/* Company input with dropdown */}
<div className="relative w-full">
  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
    Company:
  </label>
  <input
    id="company"
    type="text"
    value={inputValues.company}
    onChange={(e) => handleInputChange('company', e.target.value)}
    onKeyPress={handleKeyPress}
    onFocus={() => toggleDropdown('company')}
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
  {dropdowns.company && (
    <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full">
      {companies.map((company, index) => (
        <div
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => selectDropdownItem('company', company)}
        >
          {company}
        </div>
      ))}
    </div>
  )}
</div>
      <button
        onClick={() => onSearch(inputValues)}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Search
      </button>
    </div>
  );
};


export default FilterPanel;

