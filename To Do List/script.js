

const inputBox = document.getElementById("task_name_input");
const listContainer = document.getElementById("task_list_container");
const totalCounter = document.getElementById("total_tasks");
const completedCounter = document.getElementById("completed_tasks");
const uncompletedCounter = document.getElementById("incomplete_tasks");

function addTask() {
    const task = inputBox.value.trim();

    if (!task) {
        alert("Please enter a task");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    // Append the new task to the list
    listContainer.appendChild(li);
    inputBox.value = "";

    // Attach event listeners to the new task
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    // Checkbox event: Mark task as completed/incomplete
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // Edit button event: Edit the task
    editBtn.addEventListener("click", function () {
        const updatedTask = prompt("Edit task:", taskSpan.textContent);
        if (updatedTask !== null) {
            taskSpan.textContent = updatedTask;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // Delete button event: Remove the task
    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });

    // Update the counters
    updateCounters();
}

// Update task counters
function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const totalTasks = document.querySelectorAll("li").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = totalTasks - completedTasks;
    totalCounter.textContent = totalTasks;
}

// Add task when pressing Enter key
inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


