let taskInput = document.getElementById("task-input");
//console.log(taskInput);
taskInput.addEventListener("keypress", function (event) {
  if(event.key === "Enter"){
    event.preventDefault();
    if(taskInput.value !== "") {
        addTask();
    }
    taskInput.value = "";
} 
});
taskInput.addEventListener("focus", function(){taskInput.value = ""});

let addButton = document.getElementById("add-button");

let tabs = document.querySelectorAll(".task-tabs div") 
console.log("tabs");
addButton.addEventListener("click",addTask);

let taskList = [];
let mode = 'all' 
let filterList = [];

/**/
let underLine = document.getElementById("under-line");
let underMenu = document.querySelectorAll(".task-tabs div");

underMenu.forEach((menu) =>
  menu.addEventListener("click", (e) => underIndicator(e))
);

function underIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

for(let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event){ 
    filter(event)
  });
}
/**/

function addTask() {
    if (taskInput.value === "") return alert ("Please write down your to-do.")
    let task = {  
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false       
      }
    taskList.push(task); 
    console.log(taskList);
    render();
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = [];
  if (mode === "all") {
    list = taskList;
    // all -> taskList
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
   
  }
  // 2. 상황에 따라 리스트...

    let resultHTML = '';
    for(let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {   // 7. true이면 끝난 걸로 간주하고 밑줄(class="task-done") 보여주기.
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')" class="button-deco">check</button>
              <button onclick="deleteTask('${list[i].id}')" class="button-deco">delete</button>
            </div>
          </div>`
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')" class="button-deco">check</button>
              <button onclick="deleteTask('${list[i].id}')" class="button-deco">delete</button>
            </div>
          </div>`;
        } 
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {   // 
    console.log("체크!") // 
    console.log("id:", id) // 

    for(let i = 0; i < taskList.length; i++) {   
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete 
        }
    }
    filter();    // 
    console.log(taskList);
}

function deleteTask(id) {
  console.log("삭제하자.");
  console.log("id:",id);

  for(let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
        taskList.splice(i,1)
        break;
    }
  }
  console.log(taskList); // 
  filter();
}

function filter(event) {
  //console.log("filter", event.target.id);
  if (event) {
    mode = event.target.id; // 
  }
  filterList = [];
  if (mode === "all") {
    
    render() // 전체 리스트를 보여줘.
  } else if (mode === "ongoing") {
    
    for(let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i])
      }
    }
    render(); 
    console.log("not done", filterList);
  } else if (mode === "done") {
    // 끝나는 케이스.
    // task.isComplete = true
    for(let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i])
      }
    }
    render(); 
  }
}


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 16); 
}
