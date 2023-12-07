const express = require('express');
const router = express.Router()

router.get('/add', (req, res) => {
    obj = {
        name: 'notes added',
    }
    res.json(obj)
})
router.get('/del', (req, res) => {
    obj = {
        name: 'notes deleted',
    }
    res.json(obj)
})


module.exports = router