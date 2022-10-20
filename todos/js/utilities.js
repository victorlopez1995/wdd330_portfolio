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

            const target = taskArray.filter(function(item){
                return item.content == mytask;
            })
            const myIndex = taskArray.indexOf(target[0]);
            taskArray.splice(myIndex, 1);
            callback(mykey,taskArray);
            return myli.remove();

        })

        mycheckbutton.addEventListener('click', function(){
            // mycheckbutton.classList.toggle("checked");
            // myli.classList.toggle("checked");
            const target = taskArray.filter(function(item){
                return item.content == mytask;
            })
            const myIndex = taskArray.indexOf(target[0]);
            taskArray[myIndex].completed = !taskArray[myIndex].completed;
            callback(mykey,taskArray);

        })
        // const target = taskArray.filter(function(item){
        //     return item.content == mytask;
        // })
        // console.log(target);
        // const myIndex = taskArray.indexOf(target[0]);
        // console.log(myIndex);
        // taskArray[myIndex].completed = !taskArray[myIndex].completed;
        // callback(mykey,taskArray);
        // if (taskArray[myIndex].completed){
        //     mycheckbutton.classList.add("checked");
        //     myli.classList.add("checked");
        // }else{
        //     mycheckbutton.classList.remove("checked");
        //     myli.classList.remove("checked");
        // }

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
