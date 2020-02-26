;(function() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  const width = (canvas.width = window.innerWidth)
  const height = (canvas.height = window.innerHeight)

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  class Ball {
    constructor(x, y, speedX, speedY, color, size) {
      this.x = x
      this.y = y
      this.speedX = speedX
      this.speedY = speedY
      this.color = color
      this.size = size
    }

    draw = () => {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
      ctx.fill()
    }

    update = () => {
      if (this.x + this.size >= width) {
        this.speedX = -this.speedX
      }

      if (this.x - this.size <= 0) {
        this.speedX = -this.speedX
      }

      if (this.y + this.size >= height) {
        this.speedY = -this.speedY
      }

      if (this.y - this.size <= 0) {
        this.speedY = -this.speedY
      }

      this.x += this.speedX
      this.y += this.speedY
    }
  }

  class Board {
    constructor(numberOfBalls, width, height, ctx) {
      this.numberOfBalls = numberOfBalls
      this.width = width
      this.height = height
      this.ctx = ctx
      this.balls = []
    }

    fill = () => {
      for (let i = 0; i < this.numberOfBalls; i++) {
        let size = random(10, 20)
        let ball = new Ball(
          // ball position always drawn at least one ball width
          // away from the edge of the canvas, to avoid drawing errors
          random(0 + size, width - size),
          random(0 + size, height - size),
          random(-7, 7),
          random(-7, 7),
          'rgb(' +
            random(0, 255) +
            ',' +
            random(0, 255) +
            ',' +
            random(0, 255) +
            ')',
          size
        )
        this.balls.push(ball)
      }
      return this
    }

    start = () => {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      this.ctx.fillRect(0, 0, width, height)

      this.balls.forEach(ball => {
        ball.draw()
        ball.update()
      })

      requestAnimationFrame(this.start)
    }
  }

  const board = new Board(25, width, height, ctx)
  board.fill().start()
})()
