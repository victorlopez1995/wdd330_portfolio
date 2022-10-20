import * as ls from './ls.js';
import { createOneTask, addToArray } from './utilities.js';

const input = document.querySelector('input');
const list = document.querySelector('ul');
const button = document.querySelector('button');
const myKey = "allTask";

let allTask =  ls.getFromLs(myKey);

ls.renderList(allTask, list, createOneTask, myKey);

AddNewTask(input, list, button, allTask, ls.setToLs, myKey);


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

function removeTask(taskArray, myKey, mytask, li){
    console.log(taskArray);
    const myIndex = taskArray.indexOf(mytask);
    taskArray.splice(myIndex, 1);
    ls.setToLs(myKey,taskArray);
    return li.remove();
}
