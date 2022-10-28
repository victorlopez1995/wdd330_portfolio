// A the code that is responsible to get and set data for a part of the application is often called a model. I've used that terminology here.

//commentModel
class CommentModel {
    constructor(type) {
      this.type = type;
      // get the initial list of comments out of local storage if it exists
      this.comments = readFromLS(this.type) || [];
    }
    // I decided I could combine my getAllComments, and filterCommentsByName methods into one by passing in an optional query argument
    getComments(q = null) {
      if (q === null) {
        // no query, get all comments of the type
        return this.comments;
      } else {
        // comments for a specific post...filter by name
        return this.comments.filter(el => el.name === q);
      }
    }
  
    addComment(postName, comment) {
      const newComment = {
        name: postName,
        comment: comment,
        date: new Date()
      };
      this.comments.push(newComment);
      writeToLS(this.type, this.comments);
    }
  }
  
  function writeToLS(key, data) {
    // we can use JSON.stringify to convert our object to a string that can be stored in localStorage.
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  
  function readFromLS(key) {
    // the string we retrieve from localStorage needs to be converted back to an object with JSON.parse
    return JSON.parse(window.localStorage.getItem(key));
  }
  
  // These methods create the HTML that is needed to output our list of comments to the screen.  Anything dealing with output to the browser is catagorized as view code.
  
  const commentUI = `<div class="addComment">
  <h2>Add a comment</h2>
  <input type="text" id="commentEntry" />
  <button id="commentSubmit">Comment</button>
  </div>
  <h2>Comments</h2>
  <ul class="comments"></ul>`;
  // I only had one function for the view...so I chose not to use an object or class.
  function renderCommentList(element, comments) {
    // clear out any comments that might be listed
    element.innerHTML = '';
    // add the new list of comments
    comments.forEach(el => {
      let item = document.createElement('li');
      item.innerHTML = `
              ${el.name}: ${el.comment}
        `;
  
      element.appendChild(item);
    });
  }
  
  // Comments: this code handles getting the list of comments from the data source, and outputting them to the screen at the right time.  This is often catagorized as Controller code.
  
  class Comments {
    constructor(type, commentElementId) {
      this.type = type;
      this.commentElementId = commentElementId;
      this.model = new CommentModel(this.type);
    }
  
    addSubmitListener(postName) {
      // use element.ontouchend to avoid more than one listener getting attached at a time to the button.
      document.getElementById('commentSubmit').ontouchend = () => {
        // debugger;
        this.model.addComment(
          postName,
          document.getElementById('commentEntry').value
        );
        document.getElementById('commentEntry').value = '';
        this.showCommentList(postName);
      };
    }
    showCommentList(q = null) {
      try {
        const parent = document.getElementById(this.commentElementId);
        if (!parent) throw new Error('comment parent not found');
        // check to see if the commentUI code has been added yet
        if (parent.innerHTML === '') {
          parent.innerHTML = commentUI;
        }
        if (q !== null) {
          // looking at one post, show comments and new comment button
          document.querySelector('.addComment').style.display = 'block';
          this.addSubmitListener(q);
        } else {
          // no post name provided, hide comment entry
          document.querySelector('.addComment').style.display = 'none';
        }
        // get the comments from the model
        let comments = this.model.getComments(q);
        if (comments === null) {
          // avoid an error if there are no comments yet.
          comments = [];
        }
        renderCommentList(parent.lastChild, comments);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  export default Comments;

// import {readFromLS, writeToLS, removeLS} from './ls.js';

// let commentArray = [{
//     name: "Bechler Falls",
//     date: new Date(),
//     content: "quiero morir"
//     },
//     {
//         name: 'Teton Canyon',
//         date: new Date(),
//         content: "odio esta materia"
//       }
// ];

// export default class CommentModel {
//     constructor(type, elementId) {
//         this.type = type;
//         this.parentElement = document.getElementById(elementId);
        
//     // this.parentElement = document.getElementById(elementId);
//       // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
//     //   this.backButton = this.buildBackButton();
//     }

//     addComment(input) {
//         const task = qs(input);
//         saveTodo(task.value, this.key);
//         this.listTodos();
//         task.focus();
//         task.value = "";
//     }

//     removecomment() {
//         removeTask(this.parentElement, this.countNumberElement, this.key);
//     }
//     showCommentsList(){
//         this.parentElement.innerHTML = '';
//         // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
//         renderCommentList("all", commentArray, this.parentElement);
//         // this.addHikeListener();
//         // make sure the back button is hidden
//         // this.backButton.classList.add('hidden');

//     }
//     showSelectedList(){
//         renderCommentList(value, commentArray, this.parentElement, filterType);
//     }
// }

// function saveComment(comment, hikeName, key) {
//     // const todo = new ToDos(".list", key);
//     const newComment = {
//         name: hikeName,
//         date: new Date(),
//         content: comment
//       };
//     commentArray.push(newComment);
//     writeToLS(key, commentArray);
// }

// function renderCommentList(value="", list, element, filterType ) {

//     list.filter(getFilter(filterType, value)).forEach((comment, idx) => {
//         let li = document.createElement("li");
//         li.setAttribute("class", "li-item");
//         li.innerHTML = `
//         <p>${comment.name}</p>
//         <p>${comment.content}}</p>
//         <p>${comment.date}</p>
//         `;
//         element.appendChild(li);
//     });
// }

// function removeMyComment(element,countNumberElement, key) {
//     const childrenArray = Array.from(element.children);    
//     childrenArray.forEach(child => {
//         onTouch(child.querySelector("button"), e => {
          
//             let id = e.target.id.split("_")[0];
//             console.log(id)
//             const taskId = todoList.find((todo, idx) => `${todo.id}` == id);
//             console.log("taskId: ", taskId)
//             const idx = todoList.indexOf(taskId);
//             todoList.splice(idx, 1);
//             element.removeChild(child);
//             writeToLS(key, todoList); 
//             renderTodoCounter(todoList, countNumberElement);           
//         });
//     });
// }

// function getFilter(filterType, value){
//     switch(filterType){
//         case "all":
//             return ()=>true;
//         case "name":
//             return item => item.name == value;
//         default:
//             return ()=>true;
//     }
// }