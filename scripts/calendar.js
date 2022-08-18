import { parseDate, getStringDate, getDayAmount } from './functions.js'

let done = Number(localStorage.getItem('done_habit'))
let chosenHabits = localStorage.getItem('chosen_habit') ? JSON.parse(localStorage.getItem('chosen_habit')) : ["Charging in the morning"]
document.querySelector('.progress_right').innerHTML = done + '/' + chosenHabits.length

document.querySelector('.day').innerHTML = 'Day ' + getDayAmount()

calendar(new Date().getFullYear(), new Date().getMonth());

document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
    calendar(document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
}

document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
    calendar(document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden')
}

function calendar(year, month) {
    document.querySelector('#calendar tbody').innerHTML = ''

    let Dlast = new Date(year, month + 1, 0).getDate()
    let D = new Date(year, month, Dlast)
    let DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay()
    let DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay()
    let calendar = document.createElement('tr')

    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    if (DNfirst != 0) {
        for (let i = 1; i < DNfirst; i++) {
            let td = document.createElement('td')
            calendar.append(td)
        };
    } else {
        for (let i = 0; i < 6; i++) {
            let td = document.createElement('td')
            calendar.append(td)
        };
    }

    for (let i = 1; i <= Dlast; i++) {
        let td = document.createElement('td')
        calendar.append(td)

        if (
            i == new Date().getDate() &&
            D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()
        ) {
            td.classList.add('today')
            td.innerHTML = i
        } else if (
            new Date(D.getFullYear(), D.getMonth(), i) >= parseDate(localStorage.getItem('first_habit')) &&
            new Date(D.getFullYear(), D.getMonth(), i) <= new Date()
        ) {
            td.classList.add('red')
            td.innerHTML = i
        } else; if (
            localStorage.getItem(getStringDate(new Date(D.getFullYear(), D.getMonth(), i)))
        ) {
            td.classList.remove('red')
            td.classList.add('green')
        } else {
            td.innerHTML = i
        }

        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
            document.querySelector('#calendar tbody').append(calendar);
            calendar = document.createElement('tr')
        }
    }

    for (let i = DNlast; i < 7; i++) {
        let td = document.createElement('td')
        td.innerHTML = '&nbsp'
        calendar.append(td)
    };

    document.querySelector('#calendar tbody').append(calendar);
    document.querySelector('#calendar thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
    document.querySelector('#calendar thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#calendar thead td:nth-child(2)').dataset.year = D.getFullYear();

    if (document.querySelectorAll('#calendar tbody tr').length < 6) {
        let tr = document.createElement('tr')

        for (let i = DNlast; i < 7; i++) {
            let td = document.createElement('td')
            tr.append(td)
        };

        document.querySelector('#calendar tbody').append(tr)
    }
}