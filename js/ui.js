let ui = {
    coordinates: function () {
        draw.write(version, u(50), u(50), "black", u(40))
        draw.write(`X: ${player.blockX} Y: ${player.blockY}`, u(50), u(100), "black", u(40))
    }
}