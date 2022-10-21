
export function setToLs(key, value){
    if (key == "allTask"){ 
        localStorage.setItem(key, JSON.stringify(value));
    }else if (key == "countKey"){
        localStorage.setItem(key, value);
    }
}

export function getFromLs(key){
    if (key == "allTask"){ 
        return JSON.parse(localStorage.getItem(key));
    } else if (key == "countKey") {
        return localStorage.getItem(key);
    }
}

export function renderList(taskArray,parent,callback, myKey, count){
    if (taskArray != null){
        taskArray.forEach(element => {
            callback(element.content, parent,taskArray, setToLs, myKey, count);
        })
    }
}