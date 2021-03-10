const express = require ('express');

const router = express.Router();

const movies = require('../models/movies.js');

router.get('/', (req, res) => {
/*    movies.all((data) => {
        const hbsObject = {
            movies: data
        }
        */
        //res.render('index', hbsObject);
        res.render('index');
      });
//});

router.put('/api/movies/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;

    console.log('consition', condition);

    // movies.update({

    // })
})

module.exports = router;
