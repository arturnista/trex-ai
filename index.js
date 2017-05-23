const robot = require('robotjs')

// return console.log(robot.getMousePos())
const mouse = { x: 2203, y: 1198 }
const endGameCheckPos = { x: 2462, y: 1204 }

function isBlack(c) {
    c = c.substring(0, 2)
    return parseInt(c, 16) < 150
}

function haveToJump(x, y, jumpFn) {
    let lastHex = '1'
    for (let off = 0; off <= 20; off += 10) {
        const hex = robot.getPixelColor(x, y + off)
        const bl = isBlack(hex)
        // if(hex === '535353' || hex === 'acacac') return true
        if(lastHex !== bl) {
            if(lastHex !== '1') return jumpFn()
            lastHex = bl
        }
    }
}

function checkEndGame() {
    const hex = robot.getPixelColor(endGameCheckPos.x, endGameCheckPos.y)
    return(hex === '535353' || hex === 'acacac')
}

let jumpTime = 0
let downTime = 0
let downWaiting = 0
let treeAhead = false
let objectUnder = false

let pos = 0

setInterval(function () {
    if(checkEndGame()) {
        robot.moveMouse(endGameCheckPos.x, endGameCheckPos.y)
        robot.mouseClick()
        pos = 0
    }
}, 5000)

function game() {
    pos += 0.7

    let min = pos / 40 // 50
    min = min < 40 ? 40 : min

    // let max = pos / 28 // 70
    // max = max < 70 ? 70 : max
    for (let i = min; i <= min + 30; i += 10) {
        treeAhead = false
        haveToJump(mouse.x + i, mouse.y, () => {
            // robot.keyTap('space')
            robot.keyToggle('space', 'down')
            jumpTime = 1
            objectUnder = false
            treeAhead = true
        })
    }

    if(jumpTime > 0) {
        const ref = robot.getPixelColor(mouse.x, mouse.y + 12)
        if(pos > 1500 && (ref === '535353' || ref === 'acacac')) {
            objectUnder = true
        } else if(objectUnder) {
            downWaiting = 1
            objectUnder = false
        }

        if(treeAhead && downWaiting > 0 && downWaiting < 4) downWaiting = 3 // Set to 3 so will enter in the if

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
    setTimeout(game, 1)
}

game()
