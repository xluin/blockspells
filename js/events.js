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