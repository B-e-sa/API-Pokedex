// API links
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'
const INFO_URL = 'https://pokeapi.co/api/v2/pokemon-species/'

// Screens
const mainScreen = document.getElementById('main-screen')

const greenScreen = document.getElementById('green-screen')

const infoScreen = document.getElementById('infos')

const pokeId = document.getElementById('poke-id')

const typeScreen1 = document.getElementById('display1')

const typeScreen2 = document.getElementById('display2')

// Initial values
screenNumber = ["#"]

let pokeNumb = 0

// Pokemon front (true) or back (false) views
let pokeView = true

// Clear ID
function funcClear() {
    screenNumber = ['#']
    pokeId.innerText = screenNumber
}

// Search ID
function search() {
    // Variable that stores the id without commas and the #
    let number = screenNumber.join('').replace('#', '')

    if (number != 0) {
        // The pokedex has only 898 pokemons
        if (number > 898) {
            pokeNumb = 898
            pokeId.innerText = `#${pokeNumb}`
            reload() 
        } else {
            pokeNumb = number
            reload()
        }
    }
}

function sideView() {
    pokeView = !pokeView
    reload()
}

function lastPokemon() {
    if (pokeNumb > 1) {
        pokeNumb--
        pokeId.innerText = `#${pokeNumb}`
        reload()
    }
}

function nextPokemon() {
    if (pokeNumb < 898) {
        pokeNumb++
        pokeId.innerText = `#${pokeNumb}`
        reload()
    }
}

// Numpad numbers
function numClick(n) {

    // If id number is > 3 clear must be pressed
    if (screenNumber.length < 4) {
        switch (n) {
            case 1:
                screenNumber.push(1)
                break;

            case 2:
                screenNumber.push(2)
                break;

            case 3:
                screenNumber.push(3)
                break;

            case 4:
                screenNumber.push(4)
                break;

            case 5:
                screenNumber.push(5)
                break;

            case 6:
                screenNumber.push(6)
                break;

            case 7:
                screenNumber.push(7)
                break;

            case 8:
                screenNumber.push(8)
                break;

            case 9:
                screenNumber.push(9)
                break;

            case 0:
                screenNumber.push(0)
                break;
        }
        // Id text = screenNumber array without commas
        pokeId.innerText = screenNumber.join('')
    }
}
        

// Pokemon API
function reload() {

    const pokemonBase =

        fetch(BASE_URL + pokeNumb) // Base info (name, weight, height)
            .then(responseBase => responseBase.json())
            .then(dataBase => {

    const pokemonInfo = 
    
        fetch(INFO_URL + pokeNumb) // Description text
            .then(responseInfo => responseInfo.json())
            .then(dataInfo => {

            let pokemonName = dataBase.forms[0].name
            let pokemonType = dataBase.types
            let pokemonDescription = dataInfo.flavor_text_entries
            let sprite = dataBase.sprites

            // Pokemon image on screen
            // Basically, it will creates a image with a id, alt and width atribute
            if (pokeView == true) {
                mainScreen.innerHTML = "<img id='poke-img' alt = '" + pokemonName + "' src=" + sprite.front_default + " <img>"
            } else {
                mainScreen.innerHTML = "<img id='poke-img' alt = '" + pokemonName + "' src=" + sprite.back_default + " <img>"
            }

            // Info screen text
            infoScreen.innerText = pokemonDescription.find((text_entry => text_entry.language.name === 'en')).flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')

            // Greenscreen name display (with a 20 characters maximum)
            let greenDisplay = greenScreen.innerText = (pokemonName).toUpperCase()
            greenDisplay.length > 20 ? greenScreen.innerText = greenScreen.innerText.slice(0, 20) : null

            // Display type 1
            typeScreen1.innerText = (pokemonType[0].type.name).toUpperCase()

            // Display type 2, if it doesn't exist, display nothing instead
            try {
                typeScreen2.innerText = (pokemonType[1].type.name).toUpperCase()
            }
            catch (e) {
                typeScreen2.innerText = '-----'
            }
         })
    })
}
