// script.js
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
  
    const taskList = document.getElementById("taskList");
  
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
  
    const label = document.createElement("label");
    label.textContent = taskText;
    label.className = "task-label";
  
    checkbox.onchange = () => {
      if (checkbox.checked) {
        label.classList.add("completed");
      } else {
        label.classList.remove("completed");
      }
    };
  
    li.appendChild(checkbox);
    li.appendChild(label);
    taskList.appendChild(li);
  
    taskInput.value = "";
  }
  