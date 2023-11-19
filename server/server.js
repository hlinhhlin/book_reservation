const express = require('express');
var cors = require('cors');
const app = express();

const userapi = require('./api/userapi');
const adminapi = require('./api/adminapi');

app.use(cors()); //Enable CORS

app.use(express.json());

// Mount the apiRouter for the root route
app.use('/user', userapi);
app.use('/admin', adminapi);

// Start the server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
