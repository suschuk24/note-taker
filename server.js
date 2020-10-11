const express = require('express');

// npm's 
const fs = require('fs');
const path = require('path');

// import api and html routes
const apiRoutes = require('./routes/apiRoutes/index');
const htmlRoutes = require('./routes/htmlRoutes/index');

// instantiate server
const PORT = process.env.PORT || 3001;
const app = express();


// parse incoming string or array data, convert for future usage
app.use(express.urlencoded({ extended:true }));

// parse incoming JSON data
app.use(express.json());

// Handles static page elements (html/css)
app.use(express.static('public'));


// Use our routing routines
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});