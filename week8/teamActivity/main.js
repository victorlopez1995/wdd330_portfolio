const content = document.getElementById ("content");
const prev = document.getElementById ("prev");
const next = document.getElementById ("next");

const prevBtn = p => p===1?p:p -1;
const nextBtn = p => p===4?p:p +1;

let page = 1;


//addEventListener
function getData (page) {
    let url = `https://swapi.dev/api/vehicles/?page=${page}`;
    fetch(url)
    .then( response => {
    if(response.ok) {
        return response;
    }
    throw Error(response.statusText);
    })
    .then( response => response.json() )
    .then( data => showData(data) )
    .catch( error => console.log('There was an error:', error))
};

getData(page);

prev.addEventListener("click", ()=> {
    page = prevBtn(page);
    getData(page);
})
next.addEventListener("click", ()=> {
    page = nextBtn(page);
    console.log (page);
    getData(page);
})

function showData (data){
    content.innerHTML = "";

    for(let element of data.results){

        let name = document.createElement ("p");
        let model = document.createElement ("p");
        let manufacturer = document.createElement ("p");
        let div = document.createElement("div");

    name.innerHTML = `Name: <span>${element.name}</span>`;
    model.innerHTML = `Model: <span>${element.model}</span>`;
    manufacturer.innerHTML = `Manufacturer: <span>${element.manufacturer}</span>` ;
    
    div.appendChild(name);
    div.appendChild(model);
    div.appendChild(manufacturer);
    content.appendChild(div);

    }
   
}