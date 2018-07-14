/********************************
 * Fetches data from the api    *
********************************/
function getAnimals() {
    return fetch('/api/animal')
    .then(response => response.json())
    .then(animals => {
      console.log("Animals, I got them:", animals);
      return animals;
    })
    .catch(error => console.error("GETANIMALS:", error));
}

/********************************
 * Render a list of animals     *
 ********************************/
function renderAnimals(animals) {
    const listAnimals = animals.map(animal => `
    <li class="list-group-item">
      <strong>${animal.animalname}</strong> - ${animal.description}
    </li>`);
  const html = `<ul class="list-group">${listAnimals.join('')}</ul>`;

  return html;
}

/****************************************************
 * Fetch files from the API and render to the page  *
 ****************************************************/
function refreshAnimalList() {
    getAnimals()
    .then(animals => {
      const html = renderAnimals(animals);
      $('#list-container').html(html);
    });
}

//Submit Animal Form
function submitAnimalForm() {
    console.log("You clicked 'submit'. Congratulations.");

    const animalData = {
        animalname: $('#animal-name').val(),
        weight: $('#animal-weight').val(),
        height: $('#animal-height').val(),
        length: $('#animal-length').val(),
        class: $('#animal-class').val(),
        scientificname: $('#animal-scientific-name').val(),
        description: $('#animal-description').val(),
      };

      let method, url;
      if (animalData._id) {
        method = 'PUT';
        url = '/api/animal/' + animalData._id;
      } else {
        method = 'POST';
        url = '/api/animal';
      }

      fetch('url', {
        method: 'post',
        body: JSON.stringify(animalData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(animal => {
          console.log("We have posted the data", animal);
          refreshAnimalList();
        })
        .catch(err => {
          console.error("Well, crud! Things did not go quite right.", err);
        }) 
}
  
//Cancel Animal Form
function cancelFileForm() {
    console.log("Someone should clear the form");
}