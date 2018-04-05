// Requires
const router = require('express').Router();
const bodyParser = require('body-parser');
const companiesInfo = require('../../Companies.json');

// Server-side get call
router.get('/', function(req, res) {
    console.log("in companies route");
    res.status(200).send(companiesInfo);
})

// Export
module.exports = router;