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
      <span class="pull-right">
      <button type="button" class="btn btn-xs btn-default" onclick="handleEditAnimalClick(this)" data-animal-id="${animal._id}">Edit</button>
    </span>
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
      window.animalList = animals;
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

      console.log(animalData);

      let method, url;
      if (animalData._id) {
        method = 'PUT';
        url = '/api/animal/' + animalData._id;
      } else {
        method = 'POST';
        url = '/api/animal';
      }

      fetch(url, {
        method: 'post',
        body: JSON.stringify(animalData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        //.then(response => response.json())
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

function handleEditAnimalClick(element) {
  const animalId = element.getAttribute('data-animal-id');

  const animal = window.animalList.find(animal => animal._id === animalId);
  if (animal) {
    setForm(animal)
  }
}


function setForm(data) {
  data = data || {};

  const animal = {
    animalname: data.animalname || '',
    weight: data.weight || '',
    height: data.height || '',
    length: data.length || '',
    class: data.class || '',
    scientificname: data.scientificname || '',
    description: data.description || '',
    _id: data._id || '',
  };

  $('#animal-name').val(animal.animalname);
  $('#animal-weight').val(animal.weight);
  $('#animal-height').val(animal.height);
  $('#animal-length').val(animal.length);
  $('#animal-class').val(animal.class);
  $('#animal-scientific-name').val(animal.scientificname);
  $('#animal-description').val(animal.description);
  $('#animal-id').val(animal._id);

  if (animal._id) {
    $('#form-label').text("Edit Animal");
  } else {
    $('#form-label').text("Add Animal");
  }
}