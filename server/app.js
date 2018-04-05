// Requires
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const companiesRouter = require('./routes/companies.router');
const guestsRouter = require('./routes/guests.router');
const templatesRouter = require('./routes/templates.router');
const index = require('./routes/index.router');
const port = process.env.PORT || 4300;

// Middleware
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/companies', companiesRouter);
app.use('/guests', guestsRouter);
app.use('/templates', templatesRouter);
app.use('/', index);

// Listener
app.listen(port, function () {
    console.log('localhost running on port', port);
});