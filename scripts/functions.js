function getStringDate(date) {
    let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)

    return day + '.' + month + '.' + date.getFullYear()
}

function parseDate(date) {
    let [day, month, year] = date.split('.')

    return new Date(month + '.' + day + '.' + year)
}

function getDayAmount() {
    let day = 1

    while (true) {
        if (!localStorage.getItem(getStringDate(new Date(new Date() - 3600 * 1000 * 24 * day)))) {
            break
        }

        day++
    }

    return day
}

export { getStringDate, parseDate, getDayAmount }