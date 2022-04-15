//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)
document.querySelector('#prv').addEventListener('click', getPrvDrink)
document.querySelector('#next').addEventListener('click', getNextDrink)

let drinkHistory = []

getRandomDrink()
getRandomDrink()
getRandomDrink()
getRandomDrink()
getRandomDrink()
getRandomDrink()
getRandomDrink()


let currentDrinkIndex = 0;


function populateInitialSlides(){
    let select = 0
    for(let i=currentDrinkIndex; i < 5+currentDrinkIndex && i < drinkHistory.length+currentDrinkIndex; i++){
        document.querySelector('#name-'+select).innerText = drinkHistory[i][0].strDrink
        document.querySelector('#img-'+select).src = drinkHistory[i][0].strDrinkThumb
        select++
    }
}

function getNextDrink(){
    currentDrinkIndex++;
    if(currentDrinkIndex + 5 > drinkHistory.length){
        getRandomDrink();
    }else{
        populateInitialSlides();
    }
}

function getPrvDrink(){
    currentDrinkIndex--;
    if(currentDrinkIndex < 0 ){
        currentDrinkIndex = 0
        shiftRandomDrink();
    }else{
        populateInitialSlides();
    }
}


function getRandomDrink(){
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  fetch(`${url}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks)
    drinkHistory.push(data.drinks)
    if(drinkHistory.length >= 5){
        populateInitialSlides()
    }
    
  })
  .catch(err => {
    console.log(`error ${err}`)
  })
}

function shiftRandomDrink(){
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    fetch(`${url}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.drinks)
      drinkHistory.unshift(data.drinks)
      if(drinkHistory.length >= 5){
          populateInitialSlides()
      }
      
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
  }

function getDrink(){
    let drink = document.querySelector('input').value
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

    fetch(`${url}${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)
      document.querySelector('h2').innerText = data.drinks[0].strDrink
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
      document.querySelector('h3').innerText = data.drinks[0].strInstructions
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

