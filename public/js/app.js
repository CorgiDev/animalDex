$(document).ready(function() {
    const data = { name: "Code Louisvillains" }
    const html = `Hello ${data.name}! I am a template!`;

    $('body h2').first().after(html);
});

$(document).ready(function() {
    const lines = [
    {name: 'Buffy', value: 'Slayer, guidance counselor'},
    {name: 'Willow', value: 'Witch'},
    {name: 'Xander', value: 'Dude, construction worker'},
    {name: 'Giles', value: 'Watcher, Librarian'},
    ];

    const listHtml = lines.map(line =>
    `<div class="row">
        <div class="col-xs-6"><strong>${line.name}</strong></div>
        <div class="col-xs-6">${line.value}</div>
    </div>`).join('\n');

    $("#list-container").html(listHtml);
});


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
      <strong>${animal.title}</strong> - ${animal.description}
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
     
    console.log("Your animal data", animalData);

    fetch('/api/animal', {
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
          console.error("Well, crud! Things didn't go quite right.", err);
        }) 
}
  
//Cancel Animal Form
function cancelFileForm() {
    console.log("Someone should clear the form");
}