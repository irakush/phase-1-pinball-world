const url = 'http://localhost:3000/games'

const nav = document.querySelector('.game-list')
const title = document.querySelector('#detail-title')
const image = document.querySelector('#detail-image')
const score = document.querySelector('#detail-high-score')
const form = document.querySelector('#high-score-form')
let gameCopy = {}

getGames().then(data => { 
  displayNav(data)
  showDetails(data[0])
  handleForm()
})

function getGames(){
  return fetch(url)
  .then(res => res.json())
}

function displayNav(games){
  games.forEach(game => {
    const h5 = document.createElement('h5')
    h5.textContent = `${game.name} (${game.manufacturer_name})` 
    nav.append(h5)

    h5.addEventListener('click', () => {
      showDetails(game)
    })
  })
}

function showDetails(game){
  gameCopy = game
  title.textContent = game.name
  image.src = game.image
  score.textContent = game.high_score
}

function handleForm(){
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    gameCopy.high_score = e.target['score-input'].value
    showDetails(gameCopy)

    form.reset()
  })
}