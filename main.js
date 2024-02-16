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
  tabs[i].addEventListener("click", function(event){ // 매개변수로 event를 사용한다.
    filter(event)
  });
}
/**/

function addTask() {
    if (taskInput.value === "") return alert ("Please write down your to-do.")
    let task = {  // 객체.
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
  // 2. 상황에 따라 리스트를 달리 보여준다.

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
        } // 1. Check 버튼을 클릭하는 순간 onclick 이벤트에 이해서 toggleComplete 실행된다. 그 순간 id 값이랑 같이 가져간다.
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {   // 
    console.log("체크!") // 
    console.log("id:", id) // 

    for(let i = 0; i < taskList.length; i++) {   // 3. 위의 id 값을 가지고 taskList를 돌리면서 이 id 가지고 있는 건 누구인지 찾는다.
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete //true; (x) 체크 버튼을 다시 누르면 그 전 상태로 돌아올 수도 있어야 한다.  // 4. 찾으면 if 문에서 isComplete를 true로 바꿔준다.
            break;  // 5. 아이템을 찾는 순간 빠져나올 수 있도록 for 문을 종료한다.
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
    // 전체 리스트를 보여준다.
    render() // 전체 리스트를 보여주고 있다.
  } else if (mode === "ongoing") {
    // 진행 중인 아이템을 보여준다.
    // task.isComplete = false 값을 진행중이라고 생각.
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
