async function fetchPokemonData(input) {
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Pokémon não encontrado');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}
function displayPokemonData(data) {
  
    const pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = `
        <h2>${data.name.toUpperCase()} (ID: ${data.id})</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        <p><strong>Tipo(s):</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;


    changeBackgroundColor(data.types.map(typeInfo => typeInfo.type.name));

    currentPokemonId = data.id;
    console.log(`Current Pokémon ID set to: ${currentPokemonId}`);
}
function changeBackgroundColor(types) {
    const container = document.querySelector('.container');
    
    if (types.includes('fire')) {
        container.style.backgroundColor = 'red';
    } else if (types.includes('water')) {
        container.style.backgroundColor = 'blue';
    } else if (types.includes('grass')) {
        container.style.backgroundColor = 'green';
    } else {
        container.style.backgroundColor = 'gray';
    }
}

async function searchPokemon() {
    const input = document.getElementById('pokemonInput').value.trim();
    
    console.log(`Searching for Pokémon with input: ${input}`);

    if (input === '') {
        displayMessage('Por favor, insira um nome ou ID válido do Pokémon.');
        return;
    }

    try {
        const data = await fetchPokemonData(isNaN(input) ? input.toLowerCase() : parseInt(input));
        displayPokemonData(data);
    } catch (error) {
        displayMessage(error.message);
    }
}
function displayMessage(message) {
    console.log(`Displaying message: ${message}`);
    const pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = `<p style="color: red;">${message}</p>`;
}

let currentPokemonId = 1;

async function getNextPokemon() {
   
    if (currentPokemonId < 1010) {
        currentPokemonId++;
        console.log(`Next Pokémon ID: ${currentPokemonId}`);
        await loadPokemonById(currentPokemonId);
    }
}

async function getPreviousPokemon() {
    console.log('Previous Pokémon button clicked');
    
    if (currentPokemonId > 1) { 
        currentPokemonId--;
        console.log(`Previous Pokémon ID: ${currentPokemonId}`);
        await loadPokemonById(currentPokemonId);
    }
}
async function loadPokemonById(id) {
    console.log(`Loading Pokémon with ID: ${id}`);
    
    try {
        const data = await fetchPokemonData(id);
        displayPokemonData(data);
    } catch (error) {
        displayMessage(error.message);
    }
}

async function init() {
    console.log('Initializing with Pokémon ID 1');
    await loadPokemonById(currentPokemonId);
}

init();
