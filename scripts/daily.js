import { parseDate, getStringDate, getDayAmount } from './functions.js'

let habitList = [
    "Charging in the morning",
    "Outdoor walk",
    "Eat fruits and vegetables",
    "Sports at least 7 minutes a day",
    "10 minutes of silence",
    "Drink clean water",
    "Observe the mode of work and rest",
    "Sleep for 8 hours"
]

if (!localStorage.getItem('first_habit')) {
    localStorage.setItem('first_habit', getStringDate(new Date()))
}

if (!localStorage.getItem('last_habit')) {
    localStorage.setItem('last_habit', getStringDate(new Date()))
}

let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
if (today > parseDate(localStorage.getItem('last_habit'))) {
    localStorage.setItem('last_habit', getStringDate(today))

    localStorage.removeItem('done_habit')
    localStorage.removeItem('choice_ind_habit')
}

let done = Number(localStorage.getItem('done_habit'))
let chosenHabits = localStorage.getItem('chosen_habit') ? JSON.parse(localStorage.getItem('chosen_habit')) : ["Charging in the morning"]
let choiceIndsList = localStorage.getItem('choice_ind_habit') ? JSON.parse(localStorage.getItem('choice_ind_habit')) : Array.from({ length: chosenHabits.length }, v => v = 0)

document.querySelector('.day').innerHTML = 'Day ' + getDayAmount()
document.querySelector('.progress_right').innerHTML = done + '/' + chosenHabits.length

for (let habit of chosenHabits) {
    let active = true
    let habitIndex = chosenHabits.indexOf(habit)

    let habitBlock = document.createElement('div')
    habitBlock.classList.add('habit')

    let habitPic = document.createElement('img')
    habitPic.classList.add('habit_pic')
    habitPic.src = '../png/logo_' + (habitList.indexOf(habit) + 1) + '.png'

    let habitTitle = document.createElement('div')
    habitTitle.classList.add('habit_title')
    habitTitle.innerHTML = habit

    let cross = document.createElement('img')
    cross.src = '../png/cross.png'
    cross.classList.add('cross')

    cross.onclick = () => {
        if (!active) { return }
        active = false

        revealBigCross()

        choiceIndsList[habitIndex] = -1
        localStorage.setItem('choice_ind_habit', JSON.stringify(choiceIndsList))
    }

    let tick = document.createElement('img')
    tick.src = '../png/tick.png'
    tick.classList.add('tick')

    tick.onclick = () => {
        if (!active) { return }
        active = false

        revealBigTick()

        choiceIndsList[habitIndex] = 1
        localStorage.setItem('choice_ind_habit', JSON.stringify(choiceIndsList))

        done++
        document.querySelector('.progress_right').innerHTML = done + '/' + chosenHabits.length
        localStorage.setItem('done_habit', done)

        if (done == chosenHabits.length) {
            localStorage.setItem(getStringDate(new Date()), 1)
        }
    }

    let bigCross = document.createElement('img')
    bigCross.src = '../png/cross.png'
    bigCross.classList.add('cross_big', 'hidden')

    let bigTick = document.createElement('img')
    bigTick.src = '../png/tick.png'
    bigTick.classList.add('tick_big', 'hidden')

    habitBlock.append(habitPic, habitTitle, cross, tick, bigCross, bigTick)
    document.querySelector('.wrapper').append(habitBlock)

    if (choiceIndsList[habitIndex] == 1) {
        revealBigTick()
    } else if (choiceIndsList[habitIndex] == -1) {
        revealBigCross()
    }

    function revealBigTick() {
        tick.classList.add('hidden')
        cross.classList.add('hidden')
        bigTick.classList.remove('hidden')
    }

    function revealBigCross() {
        tick.classList.add('hidden')
        cross.classList.add('hidden')
        bigCross.classList.remove('hidden')
    }
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden')
}
