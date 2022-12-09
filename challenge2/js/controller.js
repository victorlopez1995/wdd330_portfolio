import BibleModel from "./model.js";
import BibleView from "./view.js";

export default class BibleController {
    constructor(parent, saveParent, addButton, selectName, FormIds) {
        
      this.parent = parent;
      this.parentElement = null;
      this.saveParent = saveParent;
      this.saveParentElement = null;
      this.addButton = addButton;
      this.addButtonElement =null;
      this.bibleBooks = FormIds[0];
      this.bibleBooksElement = null;
      this.biblechapter = FormIds[1];
      this.biblechapterElement = null;
      this.bibleVerse = FormIds[2];
      this.bibleVerseElement = null;
      this.bibleLanguage = FormIds[3];
      this.bibleLanguageElement = null;
      this.searchBook = FormIds[4];
      this.searchBookButton = null;
      this.searchForm = FormIds[5];
      this.searchFormElement = null;
      this.languageSaved = FormIds[6];
      this.languageSavedElement = null;
      this.selectName = selectName;
      this.arrayCheck = [];
      this.books;
      this.key = '1442de285190c454c247b6d0f9a0e1a1';
      this.lsKey = 'allVerses';
      this.testament = "";
      this.bibleModel = new BibleModel();
      this.bibleView = new BibleView();
      this.bibleKeys = {
        'english': 'de4e12af7f28f599-02',
        'spanish': '592420522e16049f-01',
        'hindi':'2133003bb8b5e62b-01',
        'arabic':'b17e246951402e50-01',
        'german':'f492a38d0e52db0f-01',
        'italian':'41f25b97f468e10b-01'
      };
      this.currentVerse = {
        id: null,
        url: "",
        language: "",
        name: ""
      };
      this.pressed = false;
    }
    async Init(){

        this.parentElement = document.querySelector(this.parent);
        this.saveParentElement = document.querySelector(this.saveParent);
        this.bibleBooksElement = document.querySelector(this.bibleBooks);
        this.bibleChapterElement = document.querySelector(this.biblechapter);
        this.bibleVerseElement = document.querySelector(this.bibleVerse);
        this.bibleLanguageElement = document.querySelector(this.bibleLanguage);
        this.searchBookButton = document.querySelector(this.searchBook);
        this.searchFormElement = document.querySelector(this.searchForm);
        this.addButtonElement = document.querySelector(this.addButton);
        this.languageSavedElement = document.querySelector(this.languageSaved);
        this.bibleModel.getBooksFromApi();
        this.setMaxChapter();
        this.setMaxVerse();
        this.bibleModel.getSavedList(this.lsKey);
        console.log(await this.bibleModel.getApiRequest('https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/1CO.1/verses', this.key))
        this.renderSaveList();
        this.addTestamentListener();
        this.addsearchListener();
        this.showSelectedLanguage();

        
        
    }
    addTestamentListener(){
        const testamentSelected = Array.from(document.getElementsByName(this.selectName));
        for(let i = 0; i < testamentSelected.length; i++) {
            testamentSelected[i].addEventListener('change', ()=>{
                if (testamentSelected[i].value == 'old'){
                    this.books = this.bibleModel.oTBooks;
                }else{
                    this.books = this.bibleModel.nTBooks;
                }
                // this.books = this.bibleModel.getBook(testamentSelected[i].value);
                this.setBibleList();
            })
        }
        this.book = "hola";
    }
    setBibleList(){
        this.bibleView.renderOptions(this.bibleBooksElement,this.books);
    }
    setMaxChapter(){
        this.bibleBooksElement.addEventListener('change', async ()=>{
            const book = this.bibleBooksElement.value;
            await this.bibleModel.getChaptersFromApi(book);
            this.bibleChapterElement.value = '';
            this.bibleChapterElement.setAttribute('max', this.bibleModel.lengthArrayChapter);
            this.bibleChapterElement.setAttribute('placeholder', `max ${this.bibleModel.lengthArrayChapter}`);
        })
    }
    setMaxVerse(){
        this.bibleChapterElement.addEventListener('input', async ()=>{
            console.log('hola');
            const book = this.bibleBooksElement.value;
            const chapter = this.bibleChapterElement.value;
            await this.bibleModel.getVersesFromApi(book, chapter);
            this.bibleVerseElement.setAttribute('placeholder', `max ${this.bibleModel.lengthArrayVerses}`);
        })
    }
    buildUrl(){
        const book = this.bibleBooksElement.value;
        const chapter = this.bibleChapterElement.value;
        let verseStart;
        let verseEnd = "";
        const language = this.bibleLanguageElement.value;
         if (this.bibleVerseElement.value == 'all'){
            verseStart = "";
         }else{
            const separatedNumbers = this.bibleVerseElement.value.split("-");
            if (separatedNumbers.length == 1){
                verseStart = "." + separatedNumbers[0];
            }else{
                verseStart = "." + separatedNumbers[0];
                verseEnd = `-${book}.${chapter}.${separatedNumbers[1]}`;
            }
         }
        const url = `https://api.scripture.api.bible/v1/bibles/${this.bibleKeys[language]}/passages/${book}.${chapter}${verseStart + verseEnd}`;
        return url; 
    }
    buildCurrentVerse(url, language, name){
        this.currentVerse.id = new Date();
        this.currentVerse.url = url;
        this.currentVerse.language = language;
        this.currentVerse.name = name;
    }
    resetCurrentVerse(){
        this.currentVerse = {
            id: null,
            url: "",
            language: "",
            name: ""
          };
    }
    buildScriptureName(){
        const book = this.bibleBooksElement.value;
        const chapter = this.bibleChapterElement.value;
        const language = this.bibleLanguageElement.value;
        let verse = this.bibleVerseElement.value;
        if (verse == 'all'){
            verse = "";
        }else{
            verse = ': ' + verse;
        }
        const name = book + ' ' + chapter + ' ' + verse + ' (' + language + ')' ;
        console.log(name); 
        return name;
    }
    addsearchListener(){
        if(this.bibleBooksElement.value != "select-book"){
            this.searchFormElement.addEventListener('submit',async  (event)=>{
                event.preventDefault();
                console.log (typeof this.bibleChapterElement.value);
                const url = this.buildUrl();
                console.log (url);
                this.parentElement.innerHTML = "<p> Loading... </p>"
                const versicles = await this.bibleModel.getApiRequest(url, this.key);
                this.parentElement.innerHTML = versicles.data.content;
                const name = this.buildScriptureName();
                this.buildCurrentVerse(url, this.bibleLanguageElement.value, name);
                this.addNewVerse();
                this.pressed = true;
            })
        }    
    }
    chargeSavedVerse(element){
        element.addEventListener('click',async  ()=>{
            const url = element.dataset.apiurl;
            this.parentElement.innerHTML = "<p> Loading... </p>"
            const versicles = await this.bibleModel.getApiRequest(url, this.key);
            this.parentElement.innerHTML = versicles.data.content;
        })
    }
    renderSaveList(){
        if (this.bibleModel.verseArray != null){

            let index = 0;
            this.bibleModel.verseArray.forEach(element => {
                const newLi = this.bibleView.createOneSaveVerse(element.name, element.url, this.saveParentElement, element.language);
                const pFormLi = newLi.children[0];
                const deleteButton = newLi.children[1];
                const dateId = element.id;
                deleteButton.addEventListener('click', ()=>{
                    this.bibleModel.deleteVerseFromLs(dateId, this.lsKey);
                    newLi.remove();
                })
                this.chargeSavedVerse(pFormLi);
                index ++;
            })
        }

    }
    addNewVerse(){

        this.addButtonElement.addEventListener('click', (event)=>{
            console.log(this.pressed)
            if (this.pressed){
                this.bibleModel.addVersetoArray(this.currentVerse);
                const newLi = this.bibleView.createOneSaveVerse(this.currentVerse.name, this.currentVerse.url,this.saveParentElement, this.currentVerse.language);
                const pFormLi = newLi.children[0];
                const deleteButton = newLi.children[1];
                const dateId = this.currentVerse.id;
                deleteButton.addEventListener('click', ()=>{
                    this.bibleModel.deleteVerseFromLs(dateId, this.lsKey);
                    newLi.remove();
                })
                this.chargeSavedVerse(pFormLi);
                this.bibleModel.setToLs(this.lsKey,this.bibleModel.verseArray);
                this.resetCurrentVerse();
                event.currentTarget.removeEventListener('click',()=>{} );
            }
            this.pressed = false
        });
    }
    showSelectedLanguage(){
        this.languageSavedElement.addEventListener('change', ()=>{
            const language = this.languageSavedElement.value;
            const liArray = Array.from(this.saveParentElement.children);
            liArray.forEach((li)=>{
                const liLanguage = li.dataset.language;
                if (language == "all"){
                    li.classList.remove('hidden');
                }else{
                    if (liLanguage == language){
                        li.classList.remove('hidden');
                    }else{
                        li.classList.add('hidden');
                    }
                }
            })
        })
    }
}