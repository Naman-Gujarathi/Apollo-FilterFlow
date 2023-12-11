import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const UserController = (req, res) => {
    // Extract API key and URL from environment variables
    const apolloApiKey = process.env.APOLLO_API_KEY;
    const apolloUrl = process.env.APOLLO_URL;

    // The payload from the request body
    const requestPayload = {
        ...req.body,
        "page": 1,         // Add the page number here
        "per_page": 30,    // Specify the number of rows per page
    };



    // Call the Apollo.io API
    axios.post(`${apolloUrl}?api_key=${apolloApiKey}`, requestPayload, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(apolloResponse => {
            // Filter function that checks if a person's current employment matches the filters
            const filterPeople = (people, filters) => {
                return people.filter(person => {
                    // For each filter, check if the person's data contains the filter's criteria
                    return Object.keys(filters).every(key => {
                        if (!filters[key]) {
                            return true; // No filter for this key
                        }
                        if (key === 'company' || key === 'jobTitle') {
                            // Check the current employment history entry for company and job title
                            const currentEmployment = person.employment_history.find(e => e.current);
                            if (!currentEmployment) return false; // No current employment found
                            return key === 'company' ? currentEmployment.organization_name === filters[key] : currentEmployment.title === filters[key];
                        } else {
                            // For location, check against city, state, and country
                            return filters[key].includes(person[key]);
                        }
                    });
                });
            };

            // Extract filters from the payload or defaults
            const filters = {
                country: requestPayload.country || '',
                state: requestPayload.state || '',
                city: requestPayload.city || '',
                company: requestPayload.company || '',
                jobTitle: requestPayload.jobTitle || '',
            };

            // Filter the response data based on the payload filters
            const filteredPeople = filterPeople(apolloResponse.data.people, filters);

            // Send the filtered data back to the client
            res.json({ ...apolloResponse.data, people: filteredPeople });
        })
        .catch(error => {
            // Handle errors from the Apollo.io API call
            console.error('Error calling Apollo.io:', error);
            res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'An error occurred when calling Apollo.io' });
        });
};

export default UserController;
