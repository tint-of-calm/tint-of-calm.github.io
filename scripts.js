// Create a new color picker instance
// https://iro.js.org/guide.html#getting-started
var iro = iro
var colorPicker = new iro.ColorPicker(".colorPicker", {
  // Color picker options
  // Option guide: https://iro.js.org/guide.html#color-picker-options
  width: 80,
  color: "rgb(255, 0, 0)",
  borderWidth: 1,
  borderColor: "#fff",
  handleRadius: 2
});

var selectColour = colorPicker.color.hexString;

function onColorChange(color, changes) {
  selectColour = (color.hexString);
}

colorPicker.on('color:change', onColorChange);

// Image fill
var context = document.getElementById("sketchpad").getContext("2d");
var image = new Image();
// Set default picture
image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99PBykyf6guvoaDh7tMzRtFXhoENT6JZzH6dQiu06elUOKzht&s"

function drawPattern() {
    context.fillStyle = context.createPattern(image, "repeat");
    context.fillRect(0, 0, 500, 400);
}

function selectimage(imagenumber) {
    image.src = document.getElementById(imagenumber).src;
}

image.onload = drawPattern;

// Variables for referencing the canvas and 2dcanvas context
var canvas,ctx;

// Variables to keep track of the mouse position and left-button status
var mouseX,mouseY,mouseDown=0;

// Variables to keep track of the touch position
var touchX,touchY;

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawDot(ctx,x,y,size) {
  // Select a fill style
  ctx.fillStyle = selectColour;

  // Draw a filled circle
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
  mouseDown=1;
  drawDot(ctx,mouseX,mouseY,3);
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
  mouseDown=0;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) {
  // Update the mouse co-ordinates when moved
  getMousePos(e);

  // Draw a dot if the mouse button is currently being pressed
  if (mouseDown==1) {
      drawDot(ctx,mouseX,mouseY,3);
  }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
  if (!e)
      var e = event;

  if (e.offsetX) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
  }
  else if (e.layerX) {
      mouseX = e.layerX;
      mouseY = e.layerY;
  }
}

// Draw something when a touch start is detected
function sketchpad_touchStart() {
// Update the touch co-ordinates
  getTouchPos();
  drawDot(ctx,touchX,touchY,3);
  // Prevents an additional mousedown event being triggered
  event.preventDefault();
}

// Draw something and prevent the default scrolling when touch movement is detected
function sketchpad_touchMove(e) {
// Update the touch co-ordinates
  getTouchPos(e);
  // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
  drawDot(ctx,touchX,touchY,3);
  // Prevent a scrolling action as a result of this touchmove triggering.
  event.preventDefault();
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
    if (!e)
        var e = event;
    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}


// Set-up the canvas and add our event handlers after the page has loaded
function init() {
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext)
        ctx = canvas.getContext('2d');

    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        // React to mouse events on the canvas, and mouseup on the entire document
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);

        // React to touch events on the canvas
        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    }
}

// Move between pages

function cheerPage() {
window.location.href = "https://tint-of-calm.github.io/cheer_up";
}

function homePage() {
window.location.href = "https://tint-of-calm.github.io";
}
