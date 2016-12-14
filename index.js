const robot = require('robotjs')

const mouse = robot.getMousePos()
console.log(robot.getPixelColor(mouse.x, mouse.y))

function haveToJump(x, y) {
    for (let off = 20; off >= 0; off -= 10) {
        const hex = robot.getPixelColor(x, y + off)
        if(hex === '535353' || hex === 'acacac') return true
    }
    return false
}

let jumpTime = 0
while(true) {
    for (let i = 40; i <= 70; i += 10) {
        if(haveToJump(mouse.x + i, mouse.y)) {
            // robot.keyTap('space')
            robot.keyToggle('space', 'down')
            jumpTime = 1
            break
        }
    }
    if(jumpTime > 0 && ++jumpTime >= 4) {
        robot.keyToggle('space', 'up')
        jumpTime = 0
    }
}
