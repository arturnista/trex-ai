const robot = require('robotjs')

const mouse = { x: 2224, y: 1210 }

function haveToJump(x, y) {
    let lastHex = ''
    for (let off = 20; off >= 0; off -= 10) {
        const hex = robot.getPixelColor(x, y + off)
        // if(hex === '535353' || hex === 'acacac') return true
        if(lastHex !== hex) {
            if(lastHex !== '') return true
            lastHex = hex
        }
    }
    return false
}

function checkEndGame() {
    const hex = robot.getPixelColor(2423, 1160)
    return(hex === '535353' || hex === 'acacac')
}

let jumpTime = 0
let downTime = 0
let downWaiting = 0
let objectUnder = false

let endGameCheck = 0

let pos = 0

while(true) {
    ++pos

    if(++endGameCheck > 1000) {
        endGameCheck = 0
        if(checkEndGame()) {
            robot.moveMouse(2423, 1160)
            robot.mouseClick()
            pos = 0
        }
    }
    let min = pos / 50 // 50
    min = min < 40 ? 40 : min
    let max = pos / 28 // 70
    max = max < 70 ? 70 : max
    for (let i = min; i <= max; i += 10) {
        if(haveToJump(mouse.x + i, mouse.y)) {
            // robot.keyTap('space')
            robot.keyToggle('space', 'down')
            jumpTime = 1
            objectUnder = false
            break
        }
    }

    if(jumpTime > 0) {
        const ref = robot.getPixelColor(mouse.x, mouse.y + 12)
        if(pos > 1500 && ref === '535353' || ref === 'acacac') {
            objectUnder = true
        } else if(objectUnder) {
            downWaiting = 1
            objectUnder = false
        }

        if(++jumpTime >= 10) {
            robot.keyToggle('space', 'up')
            jumpTime = 0
        }
    }

    if(downWaiting > 0 && ++downWaiting >= 4) {
        robot.keyToggle('down', 'down')
        downTime = 1
        downWaiting = 0
    } else if(downTime > 0 && ++downTime >= 5) {
        robot.keyToggle('down', 'up')
        downTime = 0
    }
}
