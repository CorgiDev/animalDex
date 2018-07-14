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