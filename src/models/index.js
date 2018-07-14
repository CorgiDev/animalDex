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

//Exports the Mongoose model
module.exports = Animal;
