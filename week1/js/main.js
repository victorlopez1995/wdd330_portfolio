
const links = [
    {
      label: "Week 1 notes",
      url: "index.html"
    }
  ]

function weeklyList(array, idListName){
    var ol = document.getElementById(idListName);

    array.forEach(element => {
        let link = document.createElement('a');
        link.setAttribute("href",element.url);
        link.innerHTML=element.label

        let li = document.createElement("li");
        li.appendChild(link);
        ol.appendChild(li);
    });
}

weeklyList(links, "weekList");