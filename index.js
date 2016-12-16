const robot = require('robotjs')

const mouse = { x: 2224, y: 1210 }

function isBlack(c) {
    c = c.substring(0, 2)
    return parseInt(c, 16) < 150
}

function haveToJump(x, y) {
    let lastHex = '1'
    for (let off = 20; off >= 0; off -= 10) {
        const hex = robot.getPixelColor(x, y + off)
        const bl = isBlack(hex)
        // if(hex === '535353' || hex === 'acacac') return true
        if(lastHex !== bl) {
            if(lastHex !== '1') return true
            lastHex = bl
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
let treeAhead = false
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

    // let max = pos / 28 // 70
    // max = max < 70 ? 70 : max
    for (let i = min; i <= min + 30; i += 10) {
        if(haveToJump(mouse.x + i, mouse.y)) {
            // robot.keyTap('space')
            robot.keyToggle('space', 'down')
            jumpTime = 1
            objectUnder = false
            treeAhead = true
            break
        } else {
            treeAhead = false
        }
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
}
