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