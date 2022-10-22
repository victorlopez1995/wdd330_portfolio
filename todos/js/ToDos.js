import * as ls from './ls.js';
import { createOneTask, addToArray, validateChecked, countChecked} from './utilities.js';

const input = document.querySelector('input');
const list = document.querySelector('ul');
const button = document.querySelector('.addButton');
const buttonAll = document.querySelector('.allButton');
const buttonActive = document.querySelector('.activeButton');
const buttonComplete = document.querySelector('.completeButton');
const countLeft = document.querySelector('span');
const myKey = "allTask";


let allTask =  ls.getFromLs(myKey);

ls.renderList(allTask, list, createOneTask, myKey, countLeft, true);

let elementList = document.getElementsByTagName('li');

validateChecked(allTask, elementList);

countLeft.innerHTML = countChecked(allTask);

AddNewTask(input, list, button, allTask, ls.setToLs, myKey, countLeft, false, 0);

filter(elementList, buttonActive, true, false, buttonAll, buttonComplete);
filter(elementList, buttonComplete, false, true, buttonActive, buttonAll);
filter(elementList, buttonAll, false, false, buttonActive, buttonComplete);



function AddNewTask(myInput, parent, myButton, taskArray, callback,myKey, count, render, index){
    myButton.addEventListener('click', function(){
        let mytask = myInput.value;
        if (!mytask == ""){
        myInput.value = "";
        myInput.focus();
        console.log(taskArray);
        taskArray = createOneTask(mytask ,parent, taskArray,callback, myKey, count, render, index);
        // allTask = addToArray(allTask,taskArray);
        console.log(taskArray);
        ls.setToLs(myKey,taskArray);
        countLeft.innerHTML = countChecked(taskArray);
        }
    });
}

function filter(Elements, button, displayAction1, displayAction2, cleanbutton1, cleanbutton2){
    button.addEventListener("click", function(event){
        event.target.classList.add('filterColor');
        cleanbutton1.classList.remove('filterColor');
        cleanbutton2.classList.remove('filterColor');
        let arrayElements = Array.from(Elements);
        arrayElements.forEach(element =>{
            if ((element.classList.contains("checked") && displayAction1) || (!element.classList.contains("checked")&& displayAction2)){
                // element.style.display = displayAction1;
                element.classList.add("hidden");
            }else{
                // element.style.display = displayAction2;
                element.classList.remove("hidden");
            }
        }) 
    })
}
