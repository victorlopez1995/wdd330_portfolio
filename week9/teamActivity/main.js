const audios = document.getElementsByTagName("audio");
const arrayAudios = Array.from(audios);
// console.log(arrayAudios);
let count = 10;
const keys = document.querySelectorAll(".key");

addEventListener("keypress", e=>{
    arrayAudios.forEach((audio, idx) =>{
        audio.pause();
        audio.currentTime = 0;
        if(audio.dataset.key == e.keyCode){
            audio.play();
            keys[idx].style.transform = `translatey(${count}px)`; 
            audio.addEventListener('play', (event) => {
                keys[idx].classList.add("playing");
                
            });
            
            audio.addEventListener('ended', (event) => {
                keys[idx].classList.remove("playing");
            }); 
            
            audio.addEventListener('pause', (event) => {
                keys[idx].classList.remove("playing");
            }); 
            
        }
        return
    });
    
});

