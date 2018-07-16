/*********************************
* Fetch Animal Data
**********************************/
function getAnimals() {
  return fetch('/api/animal')
    .then(response => response.json())
    .then(animals => {
      console.log("Animals, I got them:", animals);
      return animals;
    })
    .catch(error => console.error("GETANIMALS:", error));
}

/********************
* Render the list
********************/
function renderAnimals(animals) {
  const listItems = animals.map(animal => `
    <li class="list-group-item">
      <span><strong>${animal.aniname}</strong></br>${animal.description}</span>
      <span class="pull-right">
        <button type="button" class="btn btn-xs btn-warning" onclick="handleEditAnimalClick(this)" data-animal-id="${animal._id}"><strong>Edit</strong></button>
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteAnimalClick(this)" data-animal-id="${animal._id}"><strong>Del</strong></button>
      </span>
    </li>`);
  const html = `<ul class="list-group">${listItems.join('')}</ul>`;

  return html;
}

/*********************************
* Fetch animals from DB for list
**********************************/
function refreshAnimalList() {
  getAnimals()
    .then(animals => {

      window.animalList = animals;

      const html = renderAnimals(animals);
      $('#list-container').html(html);
    });
}

/*********************************
* Submit Button Handler
**********************************/
function submitAnimalForm() {
  console.log("You clicked 'submit'. Congratulations.");
 
  const animalData = {
    aniname: $('#animal-name').val(),
    aniweight: $('#animal-weight').val(),
    aniheight: $('#animal-height').val(),
    anilength: $('#animal-length').val(),
    aniclass: $('#animal-class').val(),
    sciname: $('#animal-scientific-name').val(),
    description: $('#animal-description').val(),
    _id: $('#animal-id').val(),
  };

  let method, url;
  if (animalData._id) {
    method = 'PUT';
    url = '/api/animal/' + animalData._id;
  } else {
    method = 'POST';
    url = '/api/animal';
  }
 
  fetch(url, {
    method: method,
    body: JSON.stringify(animalData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(animal => {
      console.log("we have updated the data", animal);
      setForm();
      refreshAnimalList();
    })
    .catch(err => {
      console.error("A terrible thing has happened", err);
    }) 
}

/*********************************
* Cancel Button Handler
**********************************/
 function cancelAnimalForm() {
  setForm();
  toggleAddAnimalFormVisibility();
}

/*********************************
* Clear Button Handler
**********************************/
function clearAnimalForm() {
  setForm();
}

/*********************************
* Edit Button Handler
**********************************/
function handleEditAnimalClick(element) {
  const animalId = element.getAttribute('data-animal-id');
  const animal = window.animalList.find(animal => animal._id === animalId);
  if (animal) {
    setForm(animal)
    if($('div.hidden').length) {
      toggleAddAnimalFormVisibility();
    }
  }
}

/*********************************
* Delete Button Handler
**********************************/
function handleDeleteAnimalClick(element) {
  const animalId = element.getAttribute('data-animal-id');

if (confirm("Are you sure?")) {
    deleteAnimal(animalId);
  }
}

/*********************************
* Delete Button Function
**********************************/
function deleteAnimal(animalId) {
  const url = '/api/animal/' + animalId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      console.log("EXTINCTION!!!!!");
      refreshAnimalList();
    })
    .catch(err => {
      console.error("I'm not extinct yet!", err);
    });
}

/***************************************
* Set the form based on info passed in
****************************************/
function setForm(data) {
  data = data || {};

  const animal = {
    aniname: data.aniname || '',
    aniweight: data.aniweight || '',
    aniheight: data.aniheight || '',
    anilength: data.anilength || '',
    aniclass: data.aniclass || '',
    sciname: data.sciname || '',
    description: data.description || '',
    _id: data._id || '',
  };

  $('#animal-name').val(animal.aniname);
  $('#animal-weight').val(animal.aniweight);
  $('#animal-height').val(animal.aniheight);
  $('#animal-length').val(animal.anilength);
  $('#animal-class').val(animal.aniclass);
  $('#animal-scientific-name').val(animal.sciname);
  $('#animal-description').val(animal.description);
  $('#animal-id').val(animal._id);

  if (animal._id) {
    $('#form-label').text("Edit Animal");
  } else {
    $('#form-label').text("Add Animal");
  }
}

/*********************
* Set Form VIsibility
*********************/
function handleAddAnimalClick() {
  if($('div.hidden').length) {
    setForm({});
    toggleAddAnimalFormVisibility();
  } else if (!$('div.hidden').length) {
    setForm({});
  }
  // toggleAddAnimalFormVisibility();
}

function toggleAddAnimalFormVisibility() {
  $('#form-container').toggleClass('hidden');
}