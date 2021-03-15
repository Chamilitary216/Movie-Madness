// Requires our dependencies.
const express = require ('express');
const router = express.Router();
const movies = require('../Junk/service_model');
const sequelize = require('../config/connection');

router.get('/:id', async (req, res) => {
    const userServices = await sequelize.models.service.findByPk(req.params.id)
    if (userServices) {
        res.status(200).json(userServices);
    }
    else {
        res.status(404).send('404 Not Found');
    }
});

router.post('/', async (req, res) => {
    const newService = sequelize.models.service.build({
        netflix: false,
        prime: false,
        disney: false
    })
    newService.save();
    res.status(200);
})

async function getById(req, res) {

}
module.exports = router;