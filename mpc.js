const robot = require('robotjs')

let colors = []
while (true) {
    const mouse = robot.getMousePos()
    let hex = robot.getPixelColor(mouse.x, mouse.y)
    if(colors.indexOf(hex) === -1) {
        colors.push(hex)
        console.log(hex)
    }
}
