let sides = 20
let size = 300
let maxStrokeWeight = 1
let strokeWeightValue = 0.5
let cWidth
let cHeight

function setup() {
  cWidth = windowWidth * 0.85
  cHeight = windowHeight
  createCanvas(cWidth, cHeight)
  drawOnce()
}

function drawOnce() {
  background(255)
  strokeWeight(strokeWeightValue)
  let points = polygonPoints(cWidth / 2, cHeight / 2, size, sides)
  for (let i = 0; i < sides; i++) {
    let point = points[i]
    for (let j = i + 2; j < sides; j++) {
      if ((i == 0 && j == sides - 1) || (j >= i - 1 && j <= i + 1)) {
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

function mouseWheel(event) {
  if (event.deltaY < 0) {
    size = size * 1.1
  } else {
    size = size * 0.9
  }
  drawOnce()
}

// front end functionality
const polygonSidesField = document.getElementById('polygon-sides-field')
const storkeWeightField = document.getElementById('polygon-stroke-weight-field')

polygonSidesField.addEventListener('input', (e) => {
  sides = e.target.value
  drawOnce()
})

storkeWeightField.addEventListener('input', (e) => {
  strokeWeightValue = (e.target.value / 100) * maxStrokeWeight
  drawOnce()
})
