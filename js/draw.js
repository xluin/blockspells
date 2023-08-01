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