let version = "Beta 1.0.0"

let w = window.innerWidth
let h = window.innerHeight

let previousTime = Date.now()
let deltaTime = null

let ctx = $("#canvas").getContext("2d")

let canvas = {
    setSize: function () {
        $("#canvas").width = w 
        $("#canvas").height = h 
    },
    onscreen: function (x, y, width, height) {
        if (x - player.x > w || x + width < 0 || y - player.y > h || y + height < 0) {
            return false
        } 
        else {
            return true
        }
    },
    collision: function (x1, y1, width1, height1, x2, y2, width2, height2) {
        let left1 = x1
        let right1 = x1 + width1
        let top1 = y1
        let bottom1 = y1 + height1
        let left2 = x2
        let right2 = x2 + width2
        let top2 = y2
        let bottom2 = y2 + height2
        if (right1 < left2 || left1 > right2 || bottom1 < top2 || top1 > bottom2) {
            return "no collision"
        } 
        else {
            let collisionSide = []
            if (right1 >= left2 && left1 <= left2) {
                collisionSide.push("left")
            } 
            if (left1 <= right2 && right1 >= right2) {
                collisionSide.push("right")
            } 
            if (bottom1 >= top2 && top1 <= top2) {
                collisionSide.push("top")
            } 
            if (top1 <= bottom2 && bottom1 >= bottom2) {
                collisionSide.push("bottom")
            }
            return collisionSide
        }
    }
}

let settings = {
    hitboxes: false,
    vip: false
}

let game = {
    images: [],
    preload: function () {
        blocks.forEach(function (object) {
            let img = new Image()
            img.type = object.type
            img.id = object.id
            img.src = object.src
            game.images.push(img)
        })
        skins.forEach(function (object) {
            if (object.vip === true && settings.vip === false) {
                return
            }
            else {
                let img = new Image()
                img.type = object.type
                img.id = object.id
                img.src = object.src
                game.images.push(img)
            }
        })
    },
    prepare: function () {
        canvas.setSize()
        events.key()
        player.move()
    },
    loop: function () {
        ctx.clearRect(0, 0, w, h)
        camera.start()
        player.delta()
        player.touch()
        map.draw()
        player.draw()
        camera.stop()
        ui.coordinates()
        requestAnimationFrame(() => {
            this.loop()
        })
    },
    run: function () {
        this.preload()
        this.prepare()
        this.loop()
    }
}

let ui = {
    coordinates: function () {
        draw.write(version, u(50), u(50), "black", u(40))
        draw.write(`X: ${player.blockX} Y: ${player.blockY}`, u(50), u(100), "black", u(40))
    }
}

let camera = {
    x: null,
    y: null,
    start: function () {
        this.x = player.x + player.width / 2 - w / 2
        this.y = player.y + player.height / 2 -h / 2
        ctx.translate(-this.x, -this.y)
    },
    stop: function () {
        ctx.translate(this.x, this.y)
    }
}

let player = {
    width: u(100),
    height: u(100),
    x: u(1000),
    y: u(500),
    blockX: null,
    blockY: null,
    direction: [],
    collision: [],
    stop: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    skin: "stevie",
    speed: 1.5,
    delta: function () {
        let currentTime = Date.now()
        deltaTime = (currentTime - previousTime) / 15
        previousTime = currentTime
    },
    move: function () {
        if (this.stop.up === true) {
            player.y += deltaTime * this.speed * 3.5
            this.stop.up = false
        }
        if (this.stop.down === true) {
            player.y -= deltaTime * this.speed * 3.5
            this.stop.down = false
        }
        if (this.stop.left === true) {
            player.x += deltaTime * this.speed * 3.5
            this.stop.left = false
        }
        if (this.stop.right === true) {
            player.x -= deltaTime * this.speed * 3.5
            this.stop.right = false
        }
        if (this.direction.includes("w") && this.stop.up === false) {
            this.stop.down = false
            this.stop.left = false
            this.stop.right = false
            this.y -= deltaTime * this.speed
        }
        if (this.direction.includes("s") && this.stop.down === false) {
            this.stop.up = false
            this.stop.left = false
            this.stop.right = false
            this.y += deltaTime * this.speed
        }
        if (this.direction.includes("a") && this.stop.left === false) {
            this.stop.right = false
            this.stop.up = false
            this.stop.down = false
            this.x -= deltaTime * this.speed
        }
        if (this.direction.includes("d") && this.stop.right === false) {
            this.stop.left = false
            this.stop.up = false
            this.stop.down = false
            this.x += deltaTime * this.speed
        }
        this.blockY = Math.floor(this.y / u(100)) + 1
        this.blockX = Math.floor(this.x / u(100)) + 1
        setTimeout(() => {
            this.move()
        })
    },
    draw: function () {
        game.images.forEach(function (object) {
            if (object.type === "skin" && object.id === player.skin) {
                if (object.vip === true && settings.vip === false) {
                    return
                }
                else {
                    draw.image(object, player.x, player.y, player.width, player.height)
                }
            }
        })
        if (settings.hitboxes === true) {
            draw.rectangle(this.x, this.y, this.width, this.height, null, "red", u(1))
        }
    },
    touch: function () {
        for (let x = 0; x < map.data.length; x++) {
            for (let y = 0; y < map.data[x].length; y++) {
                let type = map.data[y][x]
                blocks.forEach(function (object) {
                    if (object.n === type) {
                        if (object.gravity === true) {
                            let collisionSide = canvas.collision(player.x, player.y, player.width, player.height, x * map.blocksize, y * map.blocksize, map.blocksize, map.blocksize)
                            player.collision = collisionSide
                            if (player.collision.includes("right")) {
                                player.stop.left = true
                            }
                            if (player.collision.includes("left")) {
                                player.stop.right = true
                            }
                            if (player.collision.includes("top")) {
                                player.stop.down = true
                            }
                            if (player.collision.includes("bottom")) {
                                player.stop.up = true
                            }
                        }
                    }
                })
            }
        }
    }
}

let skins = [
    {
        type: "skin",
        id: "stevie",
        src: "assets/skins/stevie.png",
        vip: false
    }
]

let events = {
    key: function () {
        window.addEventListener("keydown", (event) => {
            player.direction.push(event.key.toLowerCase())
        })
        window.addEventListener("keyup", (event) => {
            let newarray = []
            player.direction.forEach(function (object) {
                if (object !== event.key.toLowerCase()) {
                    newarray.push(object)
                }
            })
            player.direction = newarray
        })
    }
}

let map = {
    blocksize: u(100),
    data: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
    ],
    draw: function () {
        for (let x = 0; x < this.data.length; x++) {
            for (let y = 0; y < this.data[x].length; y++) {
                let type = this.data[y][x]
                blocks.forEach(function (object) {
                    if (object.n === type && canvas.onscreen(x * map.blocksize, y * map.blocksize, map.blocksize, map.blocksize) === true) {
                        game.images.forEach(function (image) {
                            if (image.type === "block" && image.id === object.id) {
                                draw.image(image, x * map.blocksize, y * map.blocksize, map.blocksize, map.blocksize)
                                if (settings.hitboxes === true) {
                                	draw.rectangle(x * map.blocksize, y * map.blocksize, map.blocksize, map.blocksize, null, "red", u(1))
                                }
                            }
                        })
                    }
                    else {
                        return
                    }
                })
            }
        }
    }
}

let blocks = [
    {
        type: "block",
        id: "air",
        n: 0,
        gravity: false,
        src: "assets/blocks/air.png"
    },
    {
        type: "block",
        id: "grass",
        n: 1,
        gravity: true,
        src: "assets/blocks/grass.png"
    },
    {
        type: "block",
        id: "dirt",
        n: 2,
        gravity: true,
        src: "assets/blocks/dirt.png"
    },
    {
        type: "block",
        id: "stone",
        n: 3,
        gravity: true,
        src: "assets/blocks/stone.png"
    }
]

let draw = {
    rectangle: function(x, y, width, height, fillcolor, strokecolor, linewidth) {
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        if (fillcolor) {
            ctx.fillStyle = fillcolor
            ctx.fill()
        }
        if (strokecolor) {
            ctx.lineWidth = linewidth
            ctx.strokeStyle = strokecolor
            ctx.stroke()
        }
        ctx.closePath()
    },
    circle: function(x, y, radius, fillcolor, strokecolor, linewidth) {
    	ctx.beginPath()
    	ctx.arc(x, y, radius, 0, 2 * Math.PI)
    	if (fillcolor) {
        	ctx.fillStyle = fillcolor
        	ctx.fill()
    	}
    	if (strokecolor) {
        	ctx.lineWidth = linewidth
        	ctx.strokeStyle = strokecolor
        	ctx.stroke()
    	}
    	ctx.closePath()
	},
    write: function(text, x, y, color, size) {
        ctx.beginPath()
    	ctx.fillStyle = color
  		ctx.font = `${size}px Arial`
 		ctx.fillText(text, x, y)
        ctx.closePath()
	},
    image: function(img, x, y, width, height) {
        ctx.beginPath()
        ctx.drawImage(img, x, y, width, height)
        ctx.closePath()
    }
}

function u(value) {
    let diagonal = Math.sqrt(Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2))
    let numberH = null
    let numberW = null
    let number = null
    numberH = h / 910
    numberW = w / 1080
    if (numberH > numberW) {
        number = numberW
    }
    if (numberW > numberH) {
        number = numberH
    }
    let result = Math.floor(value * number)
    return result
}

function $(css) {
    return document.querySelector(css)
}

game.run()