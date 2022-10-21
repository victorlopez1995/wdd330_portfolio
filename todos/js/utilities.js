import * as ls from './ls.js';

export function createOneTask(taskInput, parent, taskArray, callback, mykey){
    const mytask = taskInput;
    if (mytask !== "" ){

        const myli = document.createElement('li');
        const mycheckbutton = document.createElement('button');
        const myuncheck = document.createElement('span');
        const mycheck = document.createElement('span');
        const mybutton = document.createElement('button');
        mycheck.textContent = "☒";
        myuncheck.textContent = "☐";
        mycheckbutton.appendChild(myuncheck);
        mycheckbutton.appendChild(mycheck);
        myli.textContent = mytask;
        mybutton.textContent = '❌';
        myli.appendChild(mycheckbutton);
        myli.appendChild(mybutton);
        parent.appendChild(myli);

        mybutton.addEventListener('click', () =>{

            const myIndex = getIndex(taskArray, mytask);
            taskArray.splice(myIndex, 1);
            callback(mykey,taskArray);
            return myli.remove();

        })

        mycheckbutton.addEventListener('click', function(){
            mycheckbutton.classList.toggle("checked");
            myli.classList.toggle("checked");
            console.log(myli);
            const myIndex = getIndex(taskArray, mytask);
            taskArray[myIndex].completed = !taskArray[myIndex].completed;
            callback(mykey,taskArray);

        })
    }
    return mytask;
}

export function addToArray(myArray, value){
    if (myArray == null){
        myArray = [];    
    }
    myArray.push({
        id: new Date(),
        content: value,
        completed: false
        }
        );
    return myArray
}

function getIndex(Array, value){
    const target = Array.filter(function(item){
        return item.content == value;
    })
    const myIndex = Array.indexOf(target[0]);
    return myIndex;
}

export function validateChecked(array, Arrayelements){
    array.forEach(element =>{
        if (element.completed){
            let myIndex = getIndex(array, element.content);
            Arrayelements[myIndex].classList.add("checked");
            Arrayelements[myIndex].children[0].classList.add("checked");
        }
    })
}

export function checkAll(Arrayelements){
    let realArray = Array.from(Arrayelements);
    realArray.forEach(element => {
        element.classList.add("checked");
        element.children[0].classList.add("checked");
    })
}