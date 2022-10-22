
export function setToLs(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLs(key){
    return JSON.parse(localStorage.getItem(key));
}

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