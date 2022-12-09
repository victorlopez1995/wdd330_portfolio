import { getJSON, getIndex } from './utilities.js';

export default class BibleModel{
    constructor() {
        this.baseUrl ='';
        this._info=[];
        this.books =[];
        this.oTBooks ={};
        this.nTBooks ={};
        this.verseArray =[];
        this.lengthArrayChapter;
        this.lengthArrayVerses;

      }
    getBook(book){
        if (book == 'old'){
            return oTBooks;
        }else{
            return nTBooks;
        }
    
    }
    async getApiRequest(url, key){
        this._info = await getJSON(url, key);
        return this._info;
    }
    async getBooksFromApi(){
        const booksArray = await this.getApiRequest('https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books', '1442de285190c454c247b6d0f9a0e1a1');
        const oTBooks = new Object();
        const nTBooks = new Object();
        for (let i = 0; i <= 38; i++) {
            oTBooks[booksArray.data[i].id] = booksArray.data[i].name;
        }
        for (let i = 39; i <= 65; i++) {
            nTBooks[booksArray.data[i].id] = booksArray.data[i].name;
        }
        this.oTBooks = oTBooks;
        console.log(this.oTBooks);
        this.nTBooks = nTBooks;
        return booksArray;
    }
    async getChaptersFromApi(book){
        const url = 'https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books/'+book+'/chapters';
        const chapterArray = await this.getApiRequest(url, '1442de285190c454c247b6d0f9a0e1a1');
        this.lengthArrayChapter = chapterArray.data.length - 1;
    }
    async getVersesFromApi(book, chapter){
        const url = 'https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/'+book+'.'+chapter+'/verses';
        const verseArray = await this.getApiRequest(url, '1442de285190c454c247b6d0f9a0e1a1');
        this.lengthArrayVerses = verseArray.data.length;
        
    }
    setToLs(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
    getFromLs(key){
        return JSON.parse(localStorage.getItem(key));
    }
    getSavedList(key){
        this.verseArray = this.getFromLs(key);
        if (this.verseArray == null){
            this.verseArray = [];
        }
        console.log (this.verseArray);
    }
    deleteVerseFromLs(id, lsKey){
        const index = getIndex(this.verseArray, id);
        this.verseArray.splice(index, 1);
        this.setToLs(lsKey, this.verseArray);
    }
    addVersetoArray(element){
        this.verseArray.push(element);
    }
}
