const robot = require('robotjs')

// return console.log(robot.getMousePos())
const mouse = { x: 2229, y: 1200 }
const endGameCheckPos = { x: 2415, y: 1146 }

function haveToJump(x, y, jumpFn) {
    let lastColor = null

    let check = (off) => {
        for (var i = -1; i <= 2; i++) {
            let yOff = i * 10
            const colorHex = robot.getPixelColor(x + off, y + yOff)
            const colorDec = parseInt(colorHex.substring(0, 2), 16) // Color in DEC
            if(!lastColor) lastColor = colorDec
            if(lastColor - colorDec > 150) {
                return jumpFn()
            }
        }
    }

    for (let off = 0; off < 30; off += 10) setTimeout(check, 1, off)
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
let initTime = new Date().getTime()

setInterval(function () {
    if(checkEndGame()) {
        robot.moveMouse(endGameCheckPos.x, endGameCheckPos.y)
        robot.mouseClick()
        initTime = new Date().getTime()
    }
}, 5000)

function game() {
    let curTime = new Date().getTime()

    let min = (curTime - initTime) / 200 // 50
    min = min < 40 ? 40 : min

    console.log(min)


    if(jumpTime > 0) {
        if(new Date().getTime() - jumpTime >= 100) {
            robot.keyToggle('space', 'up')
            jumpTime = 0
        }
    } else {
        treeAhead = false
        haveToJump(mouse.x + min, mouse.y, () => {
            robot.keyToggle('space', 'down')
            jumpTime = new Date().getTime()
            objectUnder = false
            treeAhead = true
        })
    }
    setTimeout(game, 1)
}

game()
