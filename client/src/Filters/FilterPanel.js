import React, { useState, useEffect, useRef } from 'react';

const FilterPanel = ({ onFilterChange, onSearch }) => {
    const [inputValues, setInputValues] = useState({
        location: '',
        jobTitle: '',
        company: '',
    });



    const locations = ['United States', 'Canada', 'United Kingdom', 'North America', 'Europe', 'Germany', 'Californial, US', 'San Francisco Bay Area', 'Russia', 'Texas, US', 'Greater New York City Area'];
    const jobTitles = ['engineer', 'sales manager', 'product manager', 'studnet', 'director', 'software engineer', 'consultnat', 'professor'];
    const companies = ['Google', 'Amazon', 'Microsoft', 'Linkedin', 'TED Conferences', 'Unilever', 'Forbes', 'Apple', 'IBM'];



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

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleInputChange = (name, value) => {
        setInputValues({ ...inputValues, [name]: value });
        onFilterChange(name, value);
    };

    const selectDropdownItem = (name, value) => {
        setInputValues({ ...inputValues, [name]: value });
        onFilterChange(name, value);
        setDropdowns(prevState => ({ ...prevState, [name]: false }));
    };

    const toggleDropdown = (name) => {
        setDropdowns({ ...dropdowns, [name]: !dropdowns[name] });
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
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => toggleDropdown('location')}
                    autoComplete="off"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {dropdowns.location && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-scroll">
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

            {/* Job Title input */}
            <div className="relative">
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
                    autoComplete="off"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {dropdowns.jobTitle && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-scroll">
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
            <div className="relative">
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
                    autoComplete="off"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {dropdowns.company && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-scroll">
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

            {/* Search button */}
            <button
                onClick={() => onSearch(inputValues)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Search
            </button>
        </div>
    );
}

export default FilterPanel;

