export function createOneTask(taskInput, parent, taskArray, callback, mykey, count){
    const mytask = taskInput;
    let updatedArray;
    if (mytask !== "" ){

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
        // myli.textContent = mytask;
        myli.appendChild(myp);
        myli.appendChild(mybutton);
        parent.appendChild(myli);

        updatedArray = addToArray(taskArray, mytask);
        // console.log(updatedArray);
        const newObject = updatedArray[updatedArray.length-1];

        mybutton.addEventListener('click', () =>{

            const myIndex = getIndex(updatedArray, newObject.id);
            updatedArray.splice(myIndex, 1);
            callback(mykey,updatedArray);
            count.innerHTML = countChecked(updatedArray);
            return myli.remove();

        })

        mycheckbutton.addEventListener('click', function(event){
            mycheckbutton.classList.toggle("checked");
            myli.classList.toggle("checked");
            console.log(event.Target);
            const myIndex = getIndex(updatedArray, newObject.id);
            updatedArray[myIndex].completed = !updatedArray[myIndex].completed;
            callback(mykey,updatedArray);
            count.innerHTML = countChecked(updatedArray);
        })
    }
    return updatedArray;
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
        return item.id == value;
    })
    const myIndex = Array.indexOf(target[0]);
    return myIndex;
}

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