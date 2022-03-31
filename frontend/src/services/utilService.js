function makeId(length = 15) {
    let id = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return id
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}


function concatTwoNumObj(obj1, obj2) {
    const concatedObj = JSON.parse(JSON.stringify(obj1))
    Object.keys(concatedObj).forEach(key => {
        concatedObj[key] = concatedObj[key] ? concatedObj[key] + obj2[key] : obj2[key]
    })

    return concatedObj
}



export const utilService = {
    makeId,
    getRandomInt,
    concatTwoNumObj,
}
