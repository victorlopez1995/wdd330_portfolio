// local Storage page

// set the array in the Local Storage
export function setToLs(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
// get the array in the local Storage
export function getFromLs(key){
    return JSON.parse(localStorage.getItem(key));
}
// render the array after refresh the page
export function renderList(taskArray,parent,callback, myKey, count, render){
    if (taskArray != null){
        let index = 0;
        taskArray.forEach(element => {
            callback(element.content, parent, taskArray, setToLs, myKey, count, render, index);
            console.log(taskArray);
            index ++;
        })
    }
}