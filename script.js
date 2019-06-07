var multiplier = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
var wordMultiplier = 1
var score_sheet = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 4,
  y: 8,
  z: 10
}
window.onload = function () {
  // render all letter element div
  // 12 letter max because bootstrap can divide by 12 columns (lazy..)
  for (let i = 0; i < 12; i++) {
    let letterScore = document.createElement('div')
    letterScore.className = 'letter col-1'
    letterScore.id = '' + i

    let showLetter = document.createElement('div')
    showLetter.className = 'show-letter'

    let multi = document.createElement('div')
    multi.className = 'multi text-center'
    multi.addEventListener('click', function (event) {
      updateMultiplier(event)
    })

    letterScore.appendChild(showLetter)
    letterScore.appendChild(multi)

    document.getElementsByClassName('word-score')[0].appendChild(letterScore)
  }

  // add click event listener to word multiplier
  getWordMultiplier().addEventListener('click', function (event) {
    updateWordMultiplier(event)
  })

  // add click event listener to clear word
  document.getElementById('clear').addEventListener('click', function (event) {
    getWord().value = ''
    resetMultipliers()
    updateLetter()
  })
}

// for clear button
function resetMultipliers() {
  wordMultiplier = 1
  getWordMultiplier().innerHTML = 'x1'
  for (let i = 0; i < multiplier.length; i++) {
    multiplier[i] = 1
  }
}

// update letters on changing the text
function updateLetter() {
  text = getWord().value
  for (let i = 0; i < 12; i++) {
    if (i < text.length) {
      getShowLetter(i).textContent = text[i]
      getMultiplier(i).textContent = 'x' + multiplier[i]
    } else {
      getShowLetter(i).textContent = ''
      getMultiplier(i).textContent = ''
      multiplier[i] = 1
    }
  }
  updateScore()
}

// change letter multiplier
function updateMultiplier(event) {
  let mult = event.target
  let id = parseInt(mult.parentNode.id)
  let m = parseInt(mult.textContent[1])
  switch (m) {
    case 1:
      multiplier[id] = 2
      break;
    case 2:
      multiplier[id] = 3
      break;
    case 3:
      multiplier[id] = 0
      break;
    default:
      multiplier[id] = 1
      break;
  }

  // update html
  for (let i = 0; i < 12; i++) {
    if (i < getWord().value.length) {
      getMultiplier(i).textContent = 'x' + multiplier[i]
    } else {
      getMultiplier(i).textContent = ''
      multiplier[i] = 1
    }
  }

  updateScore()
}

function updateWordMultiplier(event) {
  let mult = event.target
  let m = parseInt(mult.textContent[1])
  switch (m) {
    case 1:
      wordMultiplier = 2
      break;
    case 2:
      wordMultiplier = 3
      break;
    case 3:
      wordMultiplier = 1
      break;
    default:
      break;
  }

  // update html
  getWordMultiplier().innerHTML = 'x' + wordMultiplier
  updateScore()
}

// calculate and update score
function updateScore() {
  let word = getWord().value
  let score = 0
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    score += score_sheet[letter.toLowerCase()] * multiplier[i]
  }
  score = score * wordMultiplier

  getScore().innerHTML = score
}



// helper functions to get the html elements
function getBlock(n) {
  return document.getElementById('' + n)
}

function getShowLetter(n) {
  return document.getElementById('' + n).firstChild
}

function getMultiplier(n) {
  return getShowLetter(n).nextSibling
}

function getWord() {
  return document.getElementById('word')
}

function getWordMultiplier() {
  return document.getElementById('word-multiplier')
}

function getScore() {
  return document.getElementById('score')
}