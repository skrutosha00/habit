if (localStorage.getItem('nick_habit')) {
    document.querySelector('.input').value = localStorage.getItem('nick_habit')
}

if (!localStorage.getItem('avatar_habit')) {
    localStorage.setItem('avatar_habit', 1)
}

document.querySelector('.input').onblur = () => {
    localStorage.setItem('nick_habit', document.querySelector('.input').value)
}

for (let i = 0; i < 3; i++) {
    let avatar = document.querySelectorAll('.avatar')[i]

    if (localStorage.getItem('avatar_habit') == i + 1) {
        avatar.classList.add('active')
    }

    avatar.onclick = () => {
        for (let a of document.querySelectorAll('.avatar')) {
            a.classList.remove('active')
        }

        avatar.classList.add('active')
        localStorage.setItem('avatar_habit', i + 1)
    }
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden', 'preload')

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