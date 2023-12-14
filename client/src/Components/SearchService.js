
import { isValidString } from '../utilities/index.js';

// Function to handle the search logic
export const handleSearch = async (filters, setSearchResults, setTotalResultsCount) => {
  // Validate input filters
  for (let key of Object.keys(filters)) {
    filters[key] = filters[key].trim()
    if (filters[key].length > 0 && !isValidString(filters[key])) {
      return alert("Invalid characters detected. Only letters, numbers, commas, hyphens and whitespaces allowed")
    }
  }
  // Prepare the request payload based on filters
  const payload = {};

  if (filters.searchQuery) {
    payload.q_keywords = filters.searchQuery.trim();
  }

  if (filters.company.length > 0) {
    payload.organization_ids = [filters.company.trim()];
  }

  if (filters.location.length > 0) {
    payload.person_locations = [filters.location.trim()];
  }

  if (filters.jobTitle.length > 0) {
    payload.person_titles = [filters.jobTitle.trim()];
  }
  console.log("payload= ", payload)
  // Alert if no filters are applied
  if (Object.keys(payload).length === 0) {
    setSearchResults([]);
    setTotalResultsCount(0);
    return alert("No filters applied")
  }

  // Perform the search request
  try {

    const response = await fetch('http://ec2-54-87-30-204.compute-1.amazonaws.com:8000/api/v1', {
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

    console.log('Response Data:', data)

    // Process response data
    setSearchResults(data.people || []);
    setTotalResultsCount(data.pagination.total_entries || 0);
  } catch (error) {
    // Handle errors and alert the user
    setSearchResults([]);
    setTotalResultsCount(0);
    if (error.status === 422) {
      alert('Invalid input. Please check your search values.');
    } else {
      alert('An unexpected error occurred. Please try again later.');
    }
  }




}