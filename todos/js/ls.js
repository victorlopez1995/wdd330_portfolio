
export function setToLs(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLs(key){
    return JSON.parse(localStorage.getItem(key));
}

export function renderList(taskArray,parent,callback, myKey){
    if (taskArray != null){
        taskArray.forEach(element => {
            callback(element.content, parent,taskArray, setToLs, myKey);
        })
    }
}