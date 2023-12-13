import React, { useState, useEffect, useRef } from 'react';

const FilterPanel = ({ filters, onFilterChange, onSearch, setSearchInput }) => {
 
    const [inputValues, setInputValues] = useState(filters);


    const locations = ['United States', 'Canada', 'United Kingdom', 'North America', 'Europe', 'Germany', 'Californial, US', 'San Francisco Bay Area', 'Russia', 'Texas, US', 'Greater New York City Area'];
    const jobTitles = ['engineer', 'sales manager', 'product manager', 'student', 'director', 'software engineer', 'consultant', 'professor'];

    const [companies, setCompanies] = useState();

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/organizations", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseJson = await response.json();
            setCompanies(responseJson.organizations);
        } catch (error) {
            console.log(error);
        }
    }



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
        if (value.length === 0) {
            setDropdowns(prevState => ({ ...prevState, [name]: false }));
        }
        onFilterChange(name, value);
    };

    const selectDropdownItem = (name, value) => {
        setInputValues({ ...inputValues, [name]: name === "company" ? value.name : value });
        onFilterChange(name, name === "company" ? value.id : value);
        setDropdowns(prevState => ({ ...prevState, [name]: false }));
    };

    const toggleDropdown = (name) => {
        setDropdowns({ ...dropdowns, [name]: !dropdowns[name] });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="flex flex-col space-y-4 mb-6" ref={filterPanelRef}>
            {/*Search Bar */}
            <input
                type="text"
                placeholder="Search ..."
                onChange={(e) => handleInputChange('searchQuery', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"

            />
                
            
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
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
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
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
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
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
                {dropdowns.company && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-scroll">
                        {companies && companies.map((company, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => selectDropdownItem('company', company)}
                            >
                                {company.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Search button */}
            <button
                onClick={() => onSearch()} // Just call onSearch, the inputValues are already in state
                className="button-bg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-2"
            >
                Search
            </button>
        </div>
    );
}

export default FilterPanel;

