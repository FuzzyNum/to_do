let tasks = [];
let currentFilter = "all";

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
  renderAllTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderAllTasks();
  taskInput.value = "";
}

function renderAllTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear current list

  tasks.forEach(task => {
    if (
      currentFilter === "all" ||
      (currentFilter === "active" && !task.completed) ||
      (currentFilter === "completed" && task.completed)
    ) {
      renderTask(task);
    }
  });
}

function renderTask(task) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const label = document.createElement("label");
  label.textContent = task.text;
  label.className = "task-label";
  if (task.completed) label.classList.add("completed");

  checkbox.onchange = () => {
    task.completed = checkbox.checked;
    saveTasks();
    renderAllTasks(); // Refresh the list based on filter

    if (checkbox.checked) {
      showToast("Task completed!");
    }
  };

  li.appendChild(checkbox);
  li.appendChild(label);
  taskList.appendChild(li);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}

function setFilter(filter) {
  currentFilter = filter;
  renderAllTasks();
}

function clearCompletedTasks() {
    const anyCompleted = tasks.some(task => task.completed);
    if (!anyCompleted) {
      showToast("No completed tasks to clear.");
      return;
    }
  
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderAllTasks();
    showToast("Cleared completed tasks.");
  }
 

  document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
  

window.onload = loadTasks;

