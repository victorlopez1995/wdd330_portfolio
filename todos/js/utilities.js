
// function to create one task in the HTML 
export function createOneTask(taskInput, parent, taskArray, callback, mykey, count, render, index){
    const mytask = taskInput;
    let updatedArray;
    let newObject;

// create all elements for the task
        const myli = document.createElement('li');
        const myp = document.createElement('p');
        const mycheckbutton = document.createElement('button');
        const myuncheck = document.createElement('span');
        const mycheck = document.createElement('span');
        const mybutton = document.createElement('button');
        mycheck.textContent = "☒";
        myuncheck.textContent = "☐";
        mycheckbutton.appendChild(myuncheck);
        mycheckbutton.appendChild(mycheck);
        myp.textContent = mytask;
        
        mybutton.textContent = '❌';
        myli.appendChild(mycheckbutton);
        myli.appendChild(myp);
        myli.appendChild(mybutton);
        parent.appendChild(myli);

        if (render){
            updatedArray = taskArray;
            newObject = updatedArray[index]
        } else {
            updatedArray = addToArray(taskArray, mytask);
            newObject = updatedArray[updatedArray.length-1];
        }
        
// create button to delete the task
        mybutton.addEventListener('click', () =>{

            const myIndex = getIndex(updatedArray, newObject.id);
            updatedArray.splice(myIndex, 1);
            callback(mykey,updatedArray);
            count.innerHTML = countChecked(updatedArray);
            return myli.remove();

        })
// create button to check the task
        mycheckbutton.addEventListener('click', function(){
            mycheckbutton.classList.toggle("checked");
            myli.classList.toggle("checked");
            console.log(newObject);
            const myIndex = getIndex(updatedArray, newObject.id);
            console.log(newObject);
            updatedArray[myIndex].completed = !updatedArray[myIndex].completed;
            callback(mykey,updatedArray);
            count.innerHTML = countChecked(updatedArray);
        })

    return updatedArray;
}
// Create the element to update the local storage
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
// get index with the id from the array in the local storage
function getIndex(Array, value){
    const target = Array.filter(function(item){
        return item.id == value;
    })
    const myIndex = Array.indexOf(target[0]);
    return myIndex;
}

// Validate if the task is checked after render the local storage
export function validateChecked(array, Arrayelements){
    if (!(array == null)){
        array.forEach(element =>{
            if (element.completed){
                let myIndex = getIndex(array, element.id);
                Arrayelements[myIndex].classList.add("checked");
                Arrayelements[myIndex].children[0].classList.add("checked");
            }
        })
    }
}

// Count how many elements in the local storage has completed = true
export function countChecked(array){
    let count = 0;
    if (!(array == null)){
        array.forEach(element =>{
            if (!element.completed){
                count ++;
            }
        })
    }
    return count;
}