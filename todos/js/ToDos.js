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
const countKey = "countKey";


let allTask =  ls.getFromLs(myKey);

ls.renderList(allTask, list, createOneTask, myKey, countLeft);

let elementList = document.getElementsByTagName('li');

validateChecked(allTask, elementList);

countLeft.innerHTML = countChecked(allTask);

AddNewTask(input, list, button, allTask, ls.setToLs, myKey, countLeft);

filter(elementList, buttonActive, true, false);
filter(elementList, buttonComplete, false, true);
filter(elementList, buttonAll, false, false);



function AddNewTask(myInput, parent, myButton, taskArray, callback,myKey, count){
    myButton.addEventListener('click', function(){
        let mytask = myInput.value;
        myInput.value = "";
        myInput.focus();
        let taskAdded = createOneTask(mytask ,parent, taskArray,callback, myKey, count);
        allTask = addToArray(allTask,taskAdded);
        ls.setToLs(myKey,allTask);
        countLeft.innerHTML = countChecked(taskArray);
    });
}

function filter(Elements, button, displayAction1, displayAction2){
    button.addEventListener("click", function(){
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
