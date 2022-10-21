import * as ls from './ls.js';
import { createOneTask, addToArray, validateChecked, checkAll} from './utilities.js';

const input = document.querySelector('input');
const list = document.querySelector('ul');
const button = document.querySelector('.addButton');
const buttonAll = document.querySelector('.allButton');
const buttonActive = document.querySelector('.activeButton');
const buttonComplete = document.querySelector('.completeButton');
const myKey = "allTask";

let allTask =  ls.getFromLs(myKey);

ls.renderList(allTask, list, createOneTask, myKey);

let elementList = document.getElementsByTagName('li');

validateChecked(allTask, elementList); 

AddNewTask(input, list, button, allTask, ls.setToLs, myKey);

console.log(elementList[2].classList.contains("checked"));

filterActive(elementList, buttonActive);
// filterComplete(allTask,list, createOneTask, elementList);
// filterAll(allTask,list, createOneTask, elementList);


function AddNewTask(myInput, parent, myButton, taskArray, callback,myKey){
    myButton.addEventListener('click', function(){
        let mytask = myInput.value;
        myInput.value = "";
        myInput.focus();
        let taskAdded = createOneTask(mytask ,parent, taskArray,callback, myKey);
        allTask = addToArray(allTask,taskAdded);
        ls.setToLs(myKey,allTask);
    });
}

function filterActive(Elements, button){
    button.addEventListener("click", function(){
        let arrayElements = Array.from(Elements);
        arrayElements.forEach(element =>{
            if (element.classList.contains("checked")){
                element.style.display = "none";
            }
        })
    })
    // buttonActive.addEventListener('click', function(){
    //     const activeArray = allArray.filter(function(item){
    //         return (!item.completed);
    //     })
    //     cleanList(parent);
    //     ls.renderList(activeArray,parent,callback, Key);
    // })
    
}
// function filterComplete(allArray, parent, callback, Key){

//     buttonComplete.addEventListener('click', function(){
//         const completeArray = allArray.filter(function(item){
//             return (item.completed);
//         })
//         cleanList(parent);
//         ls.renderList(completeArray,parent,callback, Key);
//         checkAll(elementList);
//     })
    
// }

// function filterAll(allArray, parent, callback, Key){
//     buttonAll.addEventListener('click', function(){
//         cleanList(parent);
//         ls.renderList(allArray,parent,callback, Key);
//         validateChecked(allTask, elementList); 
//     })
// }

// function cleanList(parent){
//     let children = Array.from(parent.children)
//     children.forEach(child => {
//         child.remove();
//     })
// }