// Load required modules
const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    animalname: String,
    weight: String,
    height: String,
    length: String,
    class: String,
    scientificname: String,
    description: String,
    created_at: { type: Date, default: Date.now },
});

//Turns the model into a Mongoose model
const Animal = mongoose.model("Animal", AnimalSchema); 

//Get current count of documents in the collection
Animal.count({}, function(err, count) {
    if (err) {
      throw err;
    }
    if (count > 0) return ;

    const animals = require('./animal.seed.json');
    Animal.create(animals, function(err, newAnimals) {
    if (err) {
        throw err;
    }
    console.log("DB seeded")
    });
});

//Exports the Mongoose model
module.exports = Animal;