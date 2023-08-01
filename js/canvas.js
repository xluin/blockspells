let canvas = {
    setSize: function () {
        $("#canvas").width = w 
        $("#canvas").height = h 
    },
    onscreen: function (x, y, width, height) {
        if (x - player.x > w * 2 || x + width / 2 < 0 || y - player.y > h * 2 || y + height / 2 < 0) {
            return false
        } 
        else {
            return true
        }
    }
}