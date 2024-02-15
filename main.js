let horizontalUnderLine = document.getElementById("under-line");
let horizontalMenus = document.querySelectorAll("nav:first-child div");
console.log(horizontalMenus);

horizontalMenus.forEach(menu=>
    menu.addEventListener("click",(e)=>horizontalIndicator(e))
    );

    function horizontalIndicator(e) {
        horizontalUnderLine.style.left = e.currentTarget.offsetLeft+"px";
        horizontalUnderLine.style.width = e.currentTarget.offsetWidth+"px";
        horizontalUnderLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight+"px"
    }



let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];

let mode ='all'
let filterList = [];
addButton.addEventListener("click",addTask)
console.log(tabs);


for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)
    });
}


function addTask() {
        let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    };
    taskList.push(task);
    console.log(taskList);
    render(); // 변경된 taskList를 화면에 출력하기 위해 render() 함수 호출
}

function render() {
    // 1. 내가 선택 한 탭에 따라서 ,
    let list=[];
    if(mode === "all"){
        list = taskList;
    } else if (mode === "ongoing"||mode === "done"){
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다.
    // 3. alltaList
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true){
            resultHTML+=`<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div> 
       </div>`
        }else{
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div> 
   </div>`;

        }

    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id:",id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id ==id){
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id
    filterList = [];
    if(mode === "all"){
        //전체 리스트를 보여준다.
        render();
    }else if(mode === "ongoing"){
        //진행중인 아이템을 보여준다.
        //task.isComplete = false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중",filterList);
    } else if(mode==="done"){
        //끝나는 케이스
        // task.isComplete=true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}a