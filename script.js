var addInput = document.getElementById("addInput"),
  addButton = document.getElementById("addButton"),
  incompleteLisk = document.getElementById("incompleteList"),
  completedList = document.getElementById("completedList");

function bindEvent(item) {
  var editButton = item.querySelector(".edit"),
    deleteButton = item.querySelector("button.delete"),
    checkbox = item.querySelector("input[type=\"checkbox\"]");
  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkbox.onchange = checkboxEvent;
  return item;
}

function checkboxEvent() {
  var taskItem = this.parentNode,
    editButton = taskItem.querySelector("button.edit"),
    label = taskItem.querySelector("label"),
    editInput = taskItem.querySelector("input[type=\"text\"]"),
    editMode = taskItem.classList.contains("editMode");
  if (this.checked) {
    if (editMode) {
      taskItem.classList.toggle("editMode");
    }
    if (editInput.value) {
      label.innerText = editInput.value;
    }
    editButton.innerText = "Edit";
    completedList.appendChild(taskItem);
  } else {
    incompleteLisk.appendChild(taskItem);
  }
}

function editTask() {
  var editButton = this,
    taskItem = this.parentNode,
    label = taskItem.querySelector("label"),
    editInput = taskItem.querySelector("input[type=\"text\"]"),
    editMode = taskItem.classList.contains("editMode");

  if (editMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }
  taskItem.classList.toggle("editMode");
}

function deleteTask() {
  if (!Element.prototype.remove) {
    Element.prototype.remove = function remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }
  }
  var taskItem = this.parentNode;
  taskItem.remove();
}

function createTask(value) {
  var taskItem = document.createElement("li"),
    checkbox = document.createElement("input"),
    label = document.createElement("label"),
    editInput = document.createElement("input"),
    editButton = document.createElement("button"),
    deleteTaskItem = document.createElement("button");

  checkbox.type = "checkbox";
  editInput.type = "text";
  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  deleteTaskItem.innerHTML = "Delete";
  deleteTaskItem.className = "delete";
  label.innerHTML = value;

  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteTaskItem);

  return taskItem;
}

function addTask() {
  if (addInput.value) {
    var newTask = createTask(addInput.value);
    var bindingTask = bindEvent(newTask);
    incompleteLisk.appendChild(bindingTask);
    addInput.value = "";
  }
}

addButton.addEventListener("click", addTask);
