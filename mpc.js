const robot = require('robotjs')

const color = 'ff'
function isBlack(c) {
    c = c.substring(0, 2)
    return parseInt(c, 16) < 150
}
let aaa = 0
while (true) {
    const mouse = robot.getMousePos()
    let hex = robot.getPixelColor(mouse.x, mouse.y)
    if(isBlack(hex)) {
        console.log('é preto' + ++aaa)
    }
}

// let colors = []
// while (true) {
//     const mouse = robot.getMousePos()
//     let hex = robot.getPixelColor(mouse.x, mouse.y)
//     if(colors.indexOf(hex) === -1) {
//         colors.push(hex)
//         console.log(hex)
//     }
// }

// const mouse = { x: 2225, y: 1209 }
// function treeCounter(x, y) {
//     let trees = 0
//     let txt = ''
//
//     let lastWasTree = false
//     let lastWasAt = 0
//     let treeInit = 0
//     for (let i = 0; i < 600; i++) {
//         // robot.moveMouse(x + i, y + 20)
//         const hex = robot.getPixelColor(x + i, y + 10)
//         if(hex === '535353') {
//             // if(lastWasAt == 0) lastWasAt = i
//             if(!lastWasTree) {
//                 treeInit = i
//             }
//
//             lastWasTree = true
//         } else {
//             const dist = i - lastWasAt
//             if(lastWasTree && dist > 40) {
//                 const len = (i - treeInit)
//                 lastWasAt = i
//
//                 if(dist < 100) robot.keyTap('space')
//
//                 // txt += 'Tam: ' + len + ' Dist: ' + dist
//                 // trees++
//                 break
//             }
//             lastWasTree = false
//         }
//     }
//     setTimeout(function () {
//         treeCounter(mouse.x, mouse.y)
//     }, 1)
// }
// treeCounter(mouse.x, mouse.y)
