document.addEventListener("DOMContentLoaded", function () {
  const inputTask = document.querySelector("#input-task");
  const sendButton = document.querySelector("#send-button");
  const container = document.querySelector("#container");
  const searchTaskInput = document.querySelector("#search-task");

  function renderTasks(tasks) {
    container.innerHTML = "";
    tasks.forEach((task, index) => {
      sendTaskToDOM(task, index);
    });
  }

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
  }

  function sendTaskToDOM(task, index) {
    const li = document.createElement("li");

    const taskInput = document.createElement("input");
    taskInput.value = task;
    taskInput.setAttribute("data-index", index);
    taskInput.setAttribute("readonly", true);

    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.setAttribute("data-action", "edit");
    editButton.setAttribute("data-index", index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.setAttribute("data-action", "delete");
    deleteButton.setAttribute("data-index", index);

    li.appendChild(taskInput);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    container.appendChild(li);
  }

  const actions = {
    edit: (li) => {
      const inputField = li.querySelector("input[data-index]");
      const editButton = li.querySelector('button[data-action="edit"]');
      if (inputField.hasAttribute("readonly")) {
        inputField.removeAttribute("readonly");
        inputField.focus();
        editButton.textContent = "save";
      } else {
        const index = inputField.dataset.index;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index] = inputField.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        inputField.setAttribute("readonly", true);
        editButton.textContent = "edit";
        loadTasksFromLocalStorage();
      }
    },
    delete: (li) => {
      const index = li.querySelector('button[data-action="delete"]').dataset
        .index;
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasksFromLocalStorage();
    },
  };

  document.addEventListener("click", (e) => {
    const action = actions[e.target.dataset.action];
    const li = e.target.parentElement;
    if (typeof action === "function") {
      action(li);
    }
  });

  sendButton.onclick = function (event) {
    event.preventDefault();
    const task = inputTask.value;

    if (task) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      console.log(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      inputTask.value = "";
      loadTasksFromLocalStorage();
    }
  };

  searchTaskInput.addEventListener("input", function () {
    const searchTask = searchTaskInput.value;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter((task) => task.includes(searchTask));

    renderTasks(filteredTasks);
  });

  window.addEventListener("storage", function (event) {
    if (event.key === "tasks") {
      loadTasksFromLocalStorage();
    }
  });
});
