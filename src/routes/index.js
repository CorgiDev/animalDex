//Required modules
const router = require('express').Router();
const mongoose = require('mongoose');

/****************************
* C - Create animal entry
****************************/
router.post('/animal', function(req, res, next) {
  const Animal = mongoose.model('Animal');
  const animalData = {
    aniname: req.body.aniname,
    aniweight: req.body.aniweight,
    aniheight: req.body.aniheight,
    anilength: req.body.anilength,
    aniclass: req.body.aniclass,
    sciname: req.body.sciname,
    description: req.body.description,
  };

  Animal.create(animalData, function(err, newAnimal) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(newAnimal);
  });
});

/********************************
*  R - Read single animal entry
********************************/
router.get('/animal/:animalId', function(req, res, next) {
  const { animalId } = req.params;

  const animal = ANIMALS.find(entry => entry.id === animalId);
  if (!animal) {
    return res.status(404).end(`Could not find animal '${animalId}'`);
  }

  res.json(animal);
});

/******************************
* U - Update an animal entry
******************************/
router.put('/animal/:animalId', function(req, res, next) {
  const Animal = mongoose.model('Animal');
  const animalId = req.params.animalId;
  
  Animal.findById(animalId, function(err, animal) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!animal) {
      return res.status(404).json({message: "Animal not found"});
    }
  
    animal.aniname = req.body.aniname;
    animal.aniweight = req.body.aniweight;
    animal.aniheight = req.body.aniheight;
    animal.anilength = req.body.anilength;
    animal.aniclass = req.body.aniclass;
    animal.sciname = req.body.sciname;
    animal.description = req.body.description;
  
    animal.save(function(err, savedAnimal) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedAnimal);
    })
  
  })
});

/*********************************
*  D - Delete an animal entry
*********************************/
router.delete('/animal/:animalId', function(req, res, next) {
  const Animal = mongoose.model('Animal');
  const animalId = req.params.animalId;

  Animal.findById(animalId, function(err, animal) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!animal) {
      return res.status(404).json({message: "Animal not found"});
    }

    animal.deleted = true;

    animal.save(function(err, extinctAnimal) {
      res.json(extinctAnimal);
    })

  })
});

/*******************************
* List all animal entries
*******************************/
router.get('/animal', function(req, res, next) {
  const Animal = mongoose.model('Animal');
  
  Animal.find({deleted: {$ne: true}}, function(err, animals) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(animals);
  });
});

module.exports = router;