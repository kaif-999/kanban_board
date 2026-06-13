let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElement = null;

/* ===========================
   ADD TASK
=========================== */

function addTask(title, desc, column) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

    column.appendChild(div);

    // Drag
    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    // Delete
    const deleteButton = div.querySelector(".delete-btn");

    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });

    return div;
}

/* ===========================
   UPDATE COUNTS + STORAGE
=========================== */

function updateTaskCount() {
    tasksData = {};

    columns.forEach((col) => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map((task) => ({
            title: task.querySelector("h2").innerText,
            desc: task.querySelector("p").innerText,
        }));

        count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}

/* ===========================
   LOAD TASKS FROM STORAGE
=========================== */

if (localStorage.getItem("tasks")) {
    tasksData = JSON.parse(localStorage.getItem("tasks"));

    for (const col in tasksData) {
        const column = document.querySelector(`#${col}`);

        tasksData[col].forEach((task) => {
            addTask(task.title, task.desc, column);
        });
    }

    updateTaskCount();
}

/* ===========================
   DRAG & DROP
=========================== */

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        if (dragElement) {
            column.appendChild(dragElement);
        }

        column.classList.remove("hover-over");

        updateTaskCount();
    });
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

/* ===========================
   MODAL
=========================== */

const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value.trim();
    const taskDesc = document.querySelector("#task-desc-input").value.trim();

    if (!taskTitle) {
        alert("Please enter a task title");
        return;
    }

    addTask(taskTitle, taskDesc, todo);

    updateTaskCount();

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";

    modal.classList.remove("active");
});

/* ===========================
   INITIAL COUNTS
=========================== */

updateTaskCount();