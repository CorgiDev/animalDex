//Required routes and modules
const mongoose = require('mongoose');
const router = require('express').Router();

router.use('/doc', function(req, res, next) {
    res.end(`Documentation http://expressjs.com/`);
  });
  
const ANIMALS = [
    {id: 'a', animalname: 'African Lion', weight: '600 lb', height: '46.8 in', length: '111.6 in', class: 'Mammalia', scientificname: 'Panthera leo', description: 'A large feline predator, most well known for the large mane of the males.'},
    {id: 'b', animalname: 'Cheetah', weight: '159 lb', height: '35 in', length: 'none recorded', class: 'Mammalia', scientificname: 'Acinonyx jubatus', description: 'A medium size feline predator, known for its fast speed.'},
    {id: 'c', animalname: 'Laughing Kookaburra', weight: '1 lb', height: 'none recorded', length: '17 in', class: 'Aves', scientificname: 'Dacelo novaeguineae', description: 'A unique, Austrailian bird, most well known for its laugh like call.'},
    {id: 'd', animalname: 'Whale Shark', weight: '20,000 lbs', height: 'none recorded', length: '32 ft', class: 'Chondricthyes', scientificname: 'Rhincodon typus', description: 'A peaceful, large shark that people love to swim near.'},
];

/***********************************
 * C - Create an animal entry      *
 ***********************************/
router.post('/animal', function(req, res, next) {
    const Animal = mongoose.model('Animal');
    const AnimalData = {
        animalname: req.body.animalname,
        weight: req.body.weight,
        height: req.body.height,
        length: req.body.length,
        class: req.body.class,
        scientificname: req.body.scientificname,
        description: req.body.description,
    };

    Animal.create(animalData, function(err, animalFile) {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }

        res.json(newAnimal);
    });
});
/***********************************
 * R - Read a single animal entry  *
 ***********************************/
router.get('/animal/:animalId', function(req, res, next) {
    const { animalId } = req.params;

    const animal = ANIMALS.find(entry => entry.id === animalId);
    if (!animal) {
        return res.status(404).end(`Could not find file '${animalId}'`);
    }

    res.json(animal);
});
/***********************************
 * U - Update an animal entry      *
 ***********************************/
router.put('/animal/:animalId', function(req, res, next) {
    const data = req.body;
    console.log("PUT DATA", data);

    res.end(`Updating animal '${req.params.animalId}'`);
});
/***********************************
 * D - Delete an animal entry      *
 ***********************************/
router.delete('/animal/:animalId', function(req, res, next) {
    res.end(`Deleting animal '${req.params.animalId}'`);
});
/***********************************
 * List all animal entries         *
 ***********************************/
router.get('/animal', function(req, res, next) {
    mongoose.model('Animal').find({}, function(err, animals) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      
        res.json(animals);
    });
});

  module.exports = router;