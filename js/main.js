
const links = [
    {
      label: "Week 1 notes",
      url: "week1/week1.html"
    },{
      label: "Week 2 notes",
      url: "week2/week2.html"
    },{
      label: "Week 3 notes",
      url: "week3/week3.html"
    },{
      label: "Week 4 notes",
      url: "week4/week4.html"
    },{
      label: "Week 5 notes",
      url: "week5/week5.html"
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