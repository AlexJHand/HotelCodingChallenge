// Requires
const router = require('express').Router();
const bodyParser = require('body-parser');
const guestsInfo = require('../../Guests.json');

// Server-side get call
router.get('/', function (req, res) {
    console.log("in guests route");
    res.status(200).send(guestsInfo);
})

// Export
module.exports = router;