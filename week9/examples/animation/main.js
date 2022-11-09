// const squareElement = document.getElementById('square');
// let angle = 0;

// function rotate() {
//     angle = (angle + 2)%360;
//     squareElement.style.transform = `rotate(${angle}deg)`
//     window.requestAnimationFrame(rotate);
// }

// const id = requestAnimationFrame(rotate);
function youAreHere(position) {
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`); 
}
navigator.geolocation.getCurrentPosition(youAreHere);