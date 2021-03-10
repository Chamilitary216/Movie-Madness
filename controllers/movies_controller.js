const express = require ('express');

const router = express.Router();

const movies = require('../models/service_model.js');

router.get('/', (req, res) => {
    res.render('index');
});

router.put('/api/movies/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;

    console.log('condition', condition);

    // movies.update({

    // })
})

module.exports = router;
