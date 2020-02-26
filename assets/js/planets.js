;(function() {
  const planetsSpeed = {
    mercury: 10000,
    venus: 12000,
    earth: 13000,
    mars: 14000,
    jupiter: 15000,
    saturn: 16000,
    uranus: 17000,
    neptune: 18000
  }
  const planets = document.querySelectorAll(".orbit")
  const orbitAnimation = [
    {
      transform: "rotate(0)"
    },
    {
      transform: "rotate(360deg)"
    }
  ]

  planets.forEach(el => {
    const name = el.dataset.planet
    el.animate(orbitAnimation, {
      duration: planetsSpeed[name],
      iterations: Infinity
    })
  })
})()
