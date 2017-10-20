var fgimage=null;
var bgimage=null;
var fgcanvas=document.getElementById("can1");
var bgcanvas=document.getElementById("can2");
var origimage = null;
var origcanvas = null;

var originalImage = null;
var grayImage = null;
var redImage = null;
var blurImage = null;
var rainbowImage = null;
var canvas = document.getElementById("can3");

function loadImage() {
  var file = document.getElementById("finput2");
  originalImage = new SimpleImage(file);
  grayImage = new SimpleImage(file);
  redImage = new SimpleImage(file);
  blurImage = new SimpleImage(file);
  rainbowImage = new SimpleImage(file);
  originalImage.drawTo(canvas);
}

function doRainbow() {
  if(imageIsLoaded(rainbowImage)) {
    filterRainbow();
    rainbowImage.drawTo(canvas);
  }
}

function filterRainbow() {
  var height = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
}

function doBlur() {
  if(imageIsLoaded(blurImage)) {
    filterBlur();
    blurImage.drawTo(canvas);
  }
}

function filterBlur() {
  var image = new SimpleImage(blurImage);
  for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
        var other = getPixelNearby(image, x, y, 10);
        blurImage.setPixel(x, y, other);
    }
    else {
        blurImage.setPixel(x, y, pixel);
    }
  }
}

function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}

function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function doGray() {
  if (imageIsLoaded(grayImage)) {
    filterGray();
    grayImage.drawTo(canvas);
  }
}

function filterGray() {
  for (var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doRed() {
  if (imageIsLoaded(redImage)) {
    filterRed();
    redImage.drawTo(canvas);
  }
}

function filterRed() {
  for (var pixel of redImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}

function reset() {
  if (imageIsLoaded(originalImage)) {
    originalImage.drawTo(canvas);
    grayImage = new SimpleImage(originalImage);
    redImage = new SimpleImage(originalImage);
  }
}

function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded");
    return false;
  } else {
    return true;
  }
}


function uploadforeground() {
  var fileinput = document.getElementById("finput");
  fgimage = new SimpleImage(fileinput);
  fgcanvas = document.getElementById("can");
  fgimage.drawTo(fgcanvas);
}

function uploadbackground(){
  var fileinput = document.getElementById("finput1");
  bgimage = new SimpleImage(fileinput);
  bgcanvas = document.getElementById("can2");
  bgimage.drawTo(bgcanvas);
}

function doGreenScreen(){
  if(fgimage==null || !fgimage.complete()){
    alert("Foreground image not loaded");
  }
  if(bgimage==null || !bgimage.complete()){
    alert("Background iamge not loaded");
  }
  var output = new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
  var greenThreshold = 240;
  for (var pixel of fgimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      var bgPixel = bgimage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      output.setPixel(x,y,pixel);
    }
  }
  doClear(bgcanvas);
  output.drawTo(fgcanvas);
}

function clearCanvas() {
  if(imageIsLoaded(fgimage)) {
    fgimage.drawTo(fgcanvas);
  }
  if(imageIsLoaded(bgimage)) {
    bgimage.drawTo(bgcanvas);
  }
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}