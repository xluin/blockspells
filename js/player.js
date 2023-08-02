let player = {
    width: u(100),
    height: u(100),
    x: u(1000),
    y: u(500),
    blockX: null,
    blockY: null,
    direction: [],
    collision: {},
    skin: "tim",
    speed: u(2, true, w),
    jumpMultiply: u(3, true, w),
    jumpSet: u(2, true, w) * 0.03,
    jumpForce: null,
    isJumping: true, //usually set to false but enabled for spawnfalling
    delta: function () {
        let currentTime = Date.now()
        deltaTime = (currentTime - previousTime) / 15
        previousTime = currentTime
    },
    move: function () {
        this.touch()
        if (this.jumpForce === null) {
            this.jumpForce = this.jumpSet
        }
        if (this.isJumping === true) {
            this.y += this.jumpForce
            this.y -= deltaTime * this.speed * this.jumpMultiply
            this.jumpForce = this.jumpForce + this.jumpSet
        }
        if (this.direction.includes(settings.keybinds.up)) {
            //this.y -= deltaTime * this.speed * this.jumpMultiply
            this.isJumping = true
        }
        if (this.direction.includes(settings.keybinds.down)) {
            this.y += deltaTime * this.speed
        }
        if (this.direction.includes(settings.keybinds.left)) {
            this.x -= deltaTime * this.speed
        }
        if (this.direction.includes(settings.keybinds.right)) {
            this.x += deltaTime * this.speed
        }
        this.blockY = Math.floor(this.y / u(100)) + 1
        this.blockX = Math.floor(this.x / u(100)) + 1
        player.collision = {}
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
                             let playerLeft = player.x
                             let playerRight = player.x + player.width
                             let playerTop = player.y
                             let playerBottom = player.y + player.height
                             
                             let tileLeft = x * map.blocksize
                             let tileRight = x * map.blocksize + map.blocksize
                             let tileTop = y * map.blocksize
                             let tileBottom = y * map.blocksize + map.blocksize
                             // Check for collision
                             if (playerRight > tileLeft && playerLeft < tileRight && playerBottom > tileTop && playerTop < tileBottom) {
                                // Collision occurred
                                let playerHorizontalCenter = playerLeft + player.width / 2
                                let playerVerticalCenter = playerTop + player.height / 2
                                let tileHorizontalCenter = tileLeft + map.blocksize / 2
                                let tileVerticalCenter = tileTop + map.blocksize / 2
                                let horizontalDistance = playerHorizontalCenter - tileHorizontalCenter
                                let verticalDistance = playerVerticalCenter - tileVerticalCenter
                                if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
                                    // Horizontal collision
                                    if (horizontalDistance > 0) {
                                        // Player collided from the right
                                        player.x = tileRight
                                    } 
                                    else {
                                        // Player collided from the left
                                        player.x = tileLeft - player.width
                                    }
                                } 
                                else {
                                    // Vertical collision
                                    if (verticalDistance > 0) {
                                        // Player collided from the bottom
                                        player.y = tileBottom
                                    } 
                                    else {
                                        // Player collided from the top
                                        player.y = tileTop - player.height
                                        player.isJumping = false
                                        player.jumpForce = null
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }
    }
}
