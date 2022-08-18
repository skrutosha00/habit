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

let chosenHabits = localStorage.getItem('chosen_habit') ? JSON.parse(localStorage.getItem('chosen_habit')) : []

for (let habit of habitList) {
    let habitBlock = document.createElement('div')
    habitBlock.classList.add('habit')

    let habitText = document.createElement('div')
    habitText.innerHTML = habit

    let tickCont = document.createElement('div')
    tickCont.classList.add('tick_cont', 'block')

    tickCont.onclick = () => {
        tick.classList.toggle('hidden')

        if (chosenHabits.includes(habit)) {
            chosenHabits.splice(chosenHabits.indexOf(habit), 1)
        } else {
            chosenHabits.push(habit)
        }

        localStorage.setItem('chosen_habit', JSON.stringify(chosenHabits))
    }

    let tick = document.createElement('img')
    tick.classList.add('tick', 'hidden')
    tick.src = '../png/tick.png'

    if (chosenHabits.includes(habit)) {
        tick.classList.remove('hidden')
    }

    tickCont.append(tick)
    habitBlock.append(habitText, tickCont)
    document.querySelector('.choice').append(habitBlock)
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden')

    setTimeout(() => {
        for (let ind of [1, 3, 5]) {
            document.querySelector('.bg_' + ind).classList.add('active')
        }
    }, 200);

    setTimeout(() => {
        for (let ind of [2, 4]) {
            document.querySelector('.bg_' + ind).classList.add('active')
        }
    }, 600);
}