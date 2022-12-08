import BibleController from "./controller.js";
const FormIds = ['#book', '#chapter', '#verse', '#language', '#searchButton', '#searchForm', '#languageSaved'];
const bibleController = new BibleController("#scriptureResult", "#saved", '#addButton', "testament", FormIds);
bibleController.Init();

// form to small view
const smallButton = document.querySelector("#smallButton");
const headerForm = document.querySelector("#searchForm");
console.log(smallButton);
smallButton.addEventListener('click', ()=>{
    headerForm.classList.toggle('open');
})


//date

const year = document.querySelector('#currentyear')

const lastmodific = document.querySelector('#currentdate');

try {
    year.textContent = new Date().getFullYear();
    lastmodific.textContent = document.lastModified;
  } catch (e) {
    alert('Error with code or your browser does not support Locale');
  }