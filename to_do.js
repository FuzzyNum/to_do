// script.js

let tasks = [];

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => renderTask(task.text, task.completed));
  }
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
  renderTask(newTask.text, newTask.completed);
  taskInput.value = "";
}

function renderTask(text, completed) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const label = document.createElement("label");
  label.textContent = text;
  label.className = "task-label";
  if (completed) label.classList.add("completed");

  let timeoutId = null;

  checkbox.onchange = () => {
    const index = tasks.findIndex(t => t.text === text);
    if (index === -1) return;

    if (checkbox.checked) {
      label.classList.add("completed");

      // Start 2-second timer to remove task
      timeoutId = setTimeout(() => {
        tasks.splice(index, 1);          // Remove from array
        li.remove();                     // Remove from DOM
        saveTasks();                     // Save new state
      }, 2000);
    } else {
      label.classList.remove("completed");

      // Cancel deletion if unchecked quickly
      if (timeoutId !== null) clearTimeout(timeoutId);

      tasks[index].completed = false;
      saveTasks();
    }

    if (checkbox.checked) {
      tasks[index].completed = true;
    } else {
      tasks[index].completed = false;
    }

    saveTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(label);
  taskList.appendChild(li);
}

window.onload = loadTasks;
