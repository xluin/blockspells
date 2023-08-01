let map = {
    blocksize: u(100, false, w),
    data: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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