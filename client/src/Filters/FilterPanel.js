import React, { useState } from 'react';

const FilterPanel = ({ onFilterChange, onSearch }) => {
  const [inputValues, setInputValues] = useState({
    location: '',
    jobTitle: '',
    company: '',
  });

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
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={inputValues.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          onFocus={() => toggleDropdown('location')}
          // onBlur={() => setDropdowns({ ...dropdowns, location: false })}
        />
        {dropdowns.location && (
          <div className="dropdown">
            {locations.map((location, index) => (
              <div key={index} onClick={() => selectDropdownItem('location', location)}>
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label>Job Title:</label>
        <input
          type="text"
          value={inputValues.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          onFocus={() => toggleDropdown('jobTitle')}
          // onBlur={() => setDropdowns({ ...dropdowns, jobTitle: false })}
        />
        {dropdowns.jobTitle && (
          <div className="dropdown">
            {jobTitles.map((title, index) => (
              <div key={index} onClick={() => selectDropdownItem('jobTitle', title)}>
                {title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label>Company:</label>
        <input
          type="text"
          value={inputValues.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          onFocus={() => toggleDropdown('company')}
          // onBlur={() => setDropdowns({ ...dropdowns, company: false })}
        />
        {dropdowns.company && (
          <div className="dropdown">
            {companies.map((company, index) => (
              <div key={index} onClick={() => selectDropdownItem('company', company)}>
                {company}
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default FilterPanel;
