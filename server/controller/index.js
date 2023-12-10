import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();



console.log("*********process.env*************",process.env); // Check what's available in the environment variables


const UserController = (req, res) => {
        // The payload from the request body
        const apolloApiKey = process.env.APOLLO_API_KEY;
        const apolloUrl = process.env.APOLLO_URL;
        console.log("*********apolloApiKey************",apolloApiKey )
        console.log("*********aapolloUrl************",apolloUrl)
        
        const requestPayload = req.body;
        console.log("***********payload*******", requestPayload );
      
        // Using Axios to call the Apollo.io API, passing the API key as a query parameter
        console.log("********************Before AXIOS*************************");
        axios.post(`${apolloUrl}?api_key=${apolloApiKey}`, requestPayload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(apolloResponse => {
          // Send the Apollo.io response back to the client
          res.json(apolloResponse.data);
        })
        .catch(error => {
          // Handle any errors from the Apollo.io API call
          console.error('Error calling Apollo.io:', error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx and with the error data
            console.error(error.response.data);
            res.status(error.response.status).json(error.response.data);
          } else {
            res.status(500).send('An error occurred when calling Apollo.io');
          }
        });
      };



 export default UserController;