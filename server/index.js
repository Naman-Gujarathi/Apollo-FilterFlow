import express from 'express';
import cors from 'cors';
import UserRoute from './routes/UserRoute.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json



app.use('/', UserRoute);

const port = process.env.PORT; // or any port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define the endpoint in your backend


