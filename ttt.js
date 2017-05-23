const robot = require('robotjs')
// return robot.moveMouse(2235, 1230)
const mouse = robot.getMousePos()

function isBlack(c) {
    c = c.substring(0, 2)
    return parseInt(c, 16) < 150
}

let lastHex = ''
let reference = null
let jumping = false

let game = () => {
    for (var dist = 0; dist <= 100; dist++) {
        let hex = robot.getPixelColor(2235 + dist, 1230)
        if(lastHex === '') lastHex = hex
        else if(!reference && lastHex === hex) reference = isBlack(hex)
        if(isBlack(hex) !== reference) {
            console.log(dist)
            break
        }
    }
    setTimeout(game, 1)
}
game()
