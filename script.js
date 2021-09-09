// Initial Data

let currentQuestion = 0

let correctAnswers = 0

//Event

showQuestion()

document.querySelector('.scoreArea button').addEventListener('click', reset)

//Function

function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]

    let pct = Math.floor((currentQuestion / questions.length) * 100)
    document.querySelector('.progress .progress--bar').style.width = `${pct}%`

    document.querySelector('.scoreArea').style.display = 'none'
    document.querySelector('.questionArea').style.display = 'block'

    document.querySelector('.question').innerHTML = q.question

    let optionsHTML = ''

    for (i in q.options) {
      optionsHTML += `<div data-op=${i} class='option'><span> ${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`
    }

    document.querySelector('.options').innerHTML = optionsHTML

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent)
    })
  } else {
    finishQuiz()
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute('data-op'))

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers += 1
    currentQuestion += 1
    showQuestion()
  } else {
    currentQuestion += 1
    showQuestion()
  }
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100)
  document.querySelector(
    '.scoreText2'
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

  if (points <= 30) {
    document.querySelector('.scoreText1').innerHTML = 'Tá ruim em !'
    document.querySelector('.scorePct').style.color = 'red'
  } else if (points >= 30 && points <= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Precisa estudar mais !'
    document.querySelector('.scorePct').style.color = 'yellow'
  } else if (points >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Parabéns !'
    document.querySelector('.scorePct').style.color = 'green'
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`

  document.querySelector('.scoreArea').style.display = 'block'
  document.querySelector('.questionArea').style.display = 'none'

  document.querySelector('.progress .progress--bar').style.width = `100%`
}

function reset() {
  currentQuestion = 0
  correctAnswers = 0
  showQuestion()
}
