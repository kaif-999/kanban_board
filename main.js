let tasksData = {}
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done];

let dragElement = null;

if (localStorage.getItem("tasks")) {

    const data = JSON.parse(localStorage.getItem("tasks"));

    console.log(data)

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data [col].forEach(task =>{
            const div = document.createElement("div")

            div.classList.add("task")
            div.setAttribute("draggable","true")

            div.innerHTML =`
            <h2>${task.title}</h2>
<p>${task.desc}</p>
<button>Delete</button>  `

column.appendChild(div)

div.addEventListener("drag", (e) => {
    dragElement = div;
})
        })
        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right");
        count.innerText = tasks.length;
    }
}
// console.log(todo,progress,done)

const tasks = document.querySelectorAll('.task');


tasks.forEach(task => {
task.addEventListener("drag", (e) => {
    // console.log("dragging",e);
dragElement = task;


})
})


function addDragEventsOnColumn(column) {
column.addEventListener("dragenter", (e) => {
e.preventDefault();
column.classList.add("hover-over");
})
column.addEventListener("dragleave", (e) => {
e.preventDefault();
column.classList.remove("hover-over");
})


column.addEventListener("dragover", (e) => {
e.preventDefault();

})

column.addEventListener("drop", (e) => {
e.preventDefault();
// console.log("dropped", dragElement, column )



column.appendChild(dragElement);
column.classList.remove("hover-over");

columns.forEach(col => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

        
    tasksData[col.id] = Array.from(tasks).map( t  => { 
        return {
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasksData));
    count.innerText = tasks.length;
})

})


}


addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

/* Modal related Logic */
const toggleModalButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector(".modal .bg")
const modal = document.querySelector(".modal")
const addTaskButton = document.querySelector("#add-new-task")

toggleModalButton.addEventListener("click",() => {
    modal.classList.toggle("active")
})



modalBg.addEventListener("click", () => {

modal.classList.remove("active")

} )



addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value
const div = document.createElement("div")
div.classList.add("task")
div.setAttribute("draggable","true")


div.innerHTML=`
<h2>${taskTitle}</h2>
<p>${taskDesc}</p>
<button>Delete</button>
`
todo.appendChild(div)



columns.forEach(col => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

        
    tasksData[col.id] = Array.from(tasks).map( t  => { 
        return {
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasksData));
    count.innerText = tasks.length;
})
div.addEventListener("drag",(e) => {
dragElement = div;


})
modal.classList.remove("active") 
})
/* Modal related Logic */


