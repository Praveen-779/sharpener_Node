const express = require('express');

const router = express.Router();

router.get('/',(req,res,next) => {
    res.send("<h1>you have successfully posted");
});

module.exports = router;