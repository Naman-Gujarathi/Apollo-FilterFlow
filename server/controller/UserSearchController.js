import axios from 'axios';
import dotenv from 'dotenv';
import { isValidString } from "../utilities/index.js"

dotenv.config();

const UserSearchController = (req, res) => {

    const apolloApiKey = process.env.APOLLO_API_KEY;
    const apolloUrl = process.env.APOLLO_URL;

    // Building the request payload with a predefined page and per_page value
    const requestPayload = {
        ...req.body,
        "page": 1,
        "per_page": 30,
    };

    // Validating the input for specific fields
    for (let key of Object.keys(requestPayload)) {
        if (
            key === "organization_ids" ||
            key === "q_keywords" ||
            key === "person_locations" ||
            key === "person_titles"
        ) {
            if (!isValidString(requestPayload[key])) {
                return res.status(400).json({
                    message: "Invalid characters detected. Only letters, numbers, commas, hyphens and whitespaces allowed"
                });
            }
        }
    }

    console.log("requestPayload:", requestPayload)
    console.log(`url =  ${apolloUrl}?api_key=${apolloApiKey}`)

    // Making a post request to the Apollo API and handling the response
    axios.post(`${apolloUrl}?api_key=${apolloApiKey}`, requestPayload, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(apolloResponse => {
            console.log("apolloResponse.data.people.length ", apolloResponse.data.people.length)
            if (apolloResponse.data.people.length === 0) {
                apolloResponse.data.people = apolloResponse.data.contacts;
            }
            res.json({ ...apolloResponse.data, people: apolloResponse.data.people });
        })
        .catch(error => {

            console.error('Error calling Apollo.io:', error);
            res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'An error occurred when calling Apollo.io' });
        });
};

export default UserSearchController;
