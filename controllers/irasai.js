const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const irasaimodel = mongoose.model('irasai');

router.get('/', (req, res) => {

    //Irasu pridejimas

    // var irasas = new irasaimodel();
    // irasas.pavadinimas = 'Testawdawd';
    // irasas.turinys = 'JAWdawdawdawd';
    // irasas.data = '2021-09-20';
    // irasas.save();

    //Irasu paemimas

    irasaimodel.find( (erroras, informacija) => {
        if(!erroras) {

            //res.send('zinute') - Graziname fiksuota zinute i puslapi
            //res.json(informacija) - Graziname objekta informacija, kuri pasiimame callback iniciacijos pradzioje
            //res.render() - Graziname hbs sablone suformuota informacija
            //res.json(informacija);

            informacija.forEach(function(item) {
                var data = new Date(item.data);
                item.data = data.toLocaleDateString('lt-LT');
            });

            res.render('list', {data: informacija});

        } else {
            res.send('Ivyko klaida');
        }
    }).lean();

    
});

module.exports = router;