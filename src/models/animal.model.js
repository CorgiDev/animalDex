// Load mongoose package
const mongoose = require('mongoose');

//Create schema model
const AnimalSchema = new mongoose.Schema({
  aniname: String,
  aniweight: String,
  aniheight: String,
  anilength: String,
  aniclass: String,
  sciname: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false}
});

const Animal = mongoose.model('Animal', AnimalSchema);

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

module.exports = Animal;
