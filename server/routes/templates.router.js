// Requires
const router = require('express').Router();
const bodyParser = require('body-parser');
const templatesInfo = require('../../Templates.json');

// Server-side get call
router.get('/', function (req, res) {
    console.log("in templates route");
    res.status(200).send(templatesInfo);
})

// Export
module.exports = router;