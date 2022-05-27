let sides = 20
let size = 300
let maxStrokeWeight = 1
let strokeWeightValue = 0.5

function setup() {
  createCanvas(windowWidth, windowHeight)
  drawOnce()
}

function drawOnce() {
  background(255)
  strokeWeight(strokeWeightValue)
  let points = polygonPoints(windowWidth / 2, windowHeight / 2, size, sides)
  for (let i = 0; i < sides; i++) {
    let point = points[i]
    for (let j = 0; j < sides; j++) {
      if (j == 0 || j == sides - 1 || (j >= i - 1 && j <= i + 1)) {
        continue
      }
      let anotherPoint = points[j]
      line(point.x, point.y, anotherPoint.x, anotherPoint.y)
    }
  }
}

function polygonPoints(x, y, radius, npoints) {
  let angle = TWO_PI / npoints
  let points = []
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius
    let sy = y + sin(a) * radius
    points.push({ x: sx, y: sy })
  }
  return points
}

// front end functionality
const polygonSidesField = document.getElementById('polygon-sides-field')
const polygonSizeField = document.getElementById('polygon-size-field')
const storkeWeightField = document.getElementById('polygon-stroke-weight-field')

polygonSidesField.addEventListener('change', (e) => {
  sides = e.target.value
  drawOnce()
})

polygonSizeField.addEventListener('change', (e) => {
  size = e.target.value
  drawOnce()
})

storkeWeightField.addEventListener('change', (e) => {
  strokeWeightValue = (e.target.value / 100) * maxStrokeWeight
  drawOnce()
})
