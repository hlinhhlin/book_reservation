const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors()); //Enable CORS

app.use(express.json());

// Import your API router from './api'
const apiRouter = require('./api');

// Mount the apiRouter for the root route
app.use('/', apiRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
