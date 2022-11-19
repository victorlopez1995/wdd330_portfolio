window.addEventListener("load", changes);

function changes(){
    console.log("hola")
    document.querySelector("main").classList.add('morning');
    document.querySelector(".star").classList.add('morning');
    document.querySelector(".moon").classList.add('morning');
    document.querySelector(".sun").classList.add('morning');
    document.querySelector(".nube").classList.add('morning');
    document.querySelector(".mensaje").classList.add('morning');
    document.querySelector("h1").classList.add('morning');
    document.querySelector(".tocar").classList.add('morning');
}
const sun = document.querySelector(".sun");

sun.addEventListener('touchstart', video );

function video(){
    const myVideo = document.querySelector("video");
    myVideo.classList.add('morming');
    myVideo.play();

}