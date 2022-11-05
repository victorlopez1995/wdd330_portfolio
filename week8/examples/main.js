var canvas1 = document.getElementById("1");
var canvas4 = document.getElementById("4");
var canvas5 = document.getElementById("5");
var context = canvas1.getContext("2d");
context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.fillRect(10, 10, 100, 100);   
context.strokeRect(10, 10, 100, 100);

drawPattern();
drawGradient();
drawCircle(canvas4);
drawCircle(canvas5);
window.addEventListener("load", drawImageToCanvas, false);

var button = document.getElementById("saveButton");
button.addEventListener("click", saveDrawing, false);

function drawPattern() {
    var canvas = document.getElementById("2");
    var context = canvas.getContext("2d");
    context.strokeStyle = "red";

    var img = new Image(); 
    img.src = "https://picsum.photos/seed/picsum/40/40";
    img.onload = function() { 
        var pattern = context.createPattern(img, "repeat"); 
        context.fillStyle = pattern;                        
        context.fillRect(10, 10, 100, 100);                  
        context.strokeRect(10, 10, 100, 100);   
    };    
}

function drawGradient() {
    var canvas = document.getElementById("3");
    var context = canvas.getContext("2d");
    context.strokeStyle = "red";
    var gradient = context.createLinearGradient(0, 0, 0, 200); 
    gradient.addColorStop(0, "blue"); 
    gradient.addColorStop(1, "red"); 
    context.fillStyle = gradient; 
    context.fillRect(10, 10, 100, 100); 
    context.strokeRect(10, 10, 100, 100); 
}

function drawCircle(canvas) {
    var context = canvas.getContext("2d");
    context.beginPath();
}

function drawCircle(canvas) {
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(50, 50, 30, 0, Math.PI*2, true);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 3; 
    context.fill(); 
    context.stroke();
}

function saveDrawing() {
    window.open(canvas5.toDataURL("image/png"));
}

function drawImageToCanvas() {
    var canvas = document.getElementById("c6");
    var context = canvas.getContext("2d");
    var image = document.getElementById("myImageElem");
    context.drawImage(image, 68, 68); 

    var imageData = context.getImageData(0, 0, 200, 200);
    
    for (var i = 0; i < imageData.data.length; i += 4) {
    var red = imageData.data[i];
    var green = imageData.data[i + 1];
    var blue = imageData.data[i + 2];
        
    var grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
        
    imageData.data[i] = grayscale;
    imageData.data[i + 1] = grayscale;
    imageData.data[i + 2] = grayscale;
    } 
    context.putImageData(imageData, 0, 0);
}