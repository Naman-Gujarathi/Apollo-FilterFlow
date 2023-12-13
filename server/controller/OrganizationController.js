import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()

const apolloApiKey = process.env.APOLLO_API_KEY;
const apolloUrl = process.env.APOLLO_ORGANIZATION_URL;

const OrganizationController = async (req, res) => {
    const requestPayload = {
        "q_organization_fuzzy_name": "",
        "display_mode": "fuzzy_select_mode"
    };

    const apolloResponse = await axios.post(`${apolloUrl}?api_key=${apolloApiKey}`, requestPayload, {
        headers: { 'Content-Type': 'application/json' }
    })

    return res.status(200).json({ organizations: apolloResponse.data.organizations.filter((organization) => organization.domain != null) });
}

 export default OrganizationController;