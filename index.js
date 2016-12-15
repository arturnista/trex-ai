const robot = require('robotjs')

// const mouse = robot.getMousePos()
const mouse = { x: 2224, y: 1210 }

function haveToJump(x, y) {
    for (let off = 20; off >= 0; off -= 10) {
        const hex = robot.getPixelColor(x, y + off)
        if(hex === '535353' || hex === 'acacac') return true
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
    if(pos == 1000) console.log('chegou no 1000')
    else if(pos == 2000) console.log('chegou no 2000')
    else if(pos == 3000) console.log('chegou no 3000')

    if(++endGameCheck > 1000) {
        endGameCheck = 0
        if(checkEndGame()) {
            robot.moveMouse(2423, 1160)
            robot.mouseClick()
            pos = 0
        }
    }

    for (let i = 40; i <= 70; i += 10) {
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
        if(ref === '535353' || ref === 'acacac') {
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
