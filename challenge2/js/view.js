export default class BibleView{
    renderOptions(book, booksList){
        book.innerHTML="";
        let option = document.createElement("option");
        option.setAttribute("value", "select-book");
        option.innerHTML = "Select Book";

        book.appendChild(option);

         for(const key in booksList){
            let option = document.createElement("option");
            option.setAttribute("value", key);
            option.innerHTML = booksList[key];
            book.appendChild(option);
         }

    }
    // function to create one task in the HTML 
    createOneSaveVerse(verseInput, url, parent, language){
        const myVerse = verseInput;

        // create all elements for the verse
        const myli = document.createElement('li');
        const myp = document.createElement('p');
        const mybutton = document.createElement('button');

        myli.setAttribute('data-language', language);

        myp.setAttribute('data-apiurl', url);
        
        myp.textContent = myVerse;

        mybutton.textContent = '❌';
        myli.appendChild(myp);
        myli.appendChild(mybutton);
        parent.appendChild(myli);

        return myli;
    }
}
