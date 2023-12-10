import express from 'express';
import UserRoute from './routes/UserRoute.js'

const app = express();


app.use(express.json()); // for parsing application/json



app.use('/', UserRoute);

const port = 8000; // or any port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define the endpoint in your backend


