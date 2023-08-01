function u(value, real, type) {
    let diagonal = Math.sqrt(Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2))
    let numberH = null
    let numberW = null
    let number = null
    numberH = h / 910
    numberW = w / 1080
    if (numberH > numberW && type !== "h") {
        number = numberW
    }
    if (numberW > numberH && type !== "w") {
        number = numberH
    }
    if (real === true) {
        let result = value * number
        return result
    }
    else {
        let result = Math.floor(value * number)
        return result
    }
}

function $(css) {
    return document.querySelector(css)
}