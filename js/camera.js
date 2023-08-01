let camera = {
    x: null,
    y: null,
    start: function () {
        this.x = player.x + player.width / 2 - w / 2
        this.y = player.y + player.height / 2 -h / 2
        if (this.x < 0) {
            this.x = 0
        } 
        if (this.x > map.data.length * map.blocksize - w - map.blocksize * 2) {
            this.x = map.data.length * map.blocksize - w - map.blocksize * 2
        }
        if (this.y < 0) {
            this.y = 0
        } 
        if (this.y > map.data[0].length * map.blocksize - h) {
            this.y = map.data[0].length * map.blocksize - h
        }
        ctx.translate(-this.x, -this.y)
    },
    stop: function () {
        ctx.translate(this.x, this.y)
    }
}