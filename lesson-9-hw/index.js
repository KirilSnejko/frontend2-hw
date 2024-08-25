document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.querySelector("#addTaskButton");
  const ul = document.querySelector("#itemsList");
  const inputTask = document.querySelector("#inputTask");
  const errorText = document.querySelector("#errorText");

  addTaskButton.onclick = addTask;

  function addTask() {
    const li = document.createElement("li");
    const taskValue = inputTask.value;

    if (taskValue === "") {
      errorText.textContent = "Поле не может быть пустым";
      inputTask.value = "Например, новая задача";
      return;
    } else {
      li.insertAdjacentHTML(
        "beforeend",
        `
          <input type="checkbox" class="task-checkbox">
          ${taskValue}
          <button class="remove-button">[x]</button>
          <button class="edit-button">[edit]</button>
        `
      );
      errorText.textContent = "";
    }
    ul.appendChild(li);
    inputTask.value = "Например, новая задача";
  }

  class ManagerEvents {
    constructor(elem) {
      elem.onclick = this.onClick.bind(this);
    }

    check(event) {
      const checkbox = event.target;
      const li = checkbox.parentElement;
      if (checkbox.classList.contains("task-checkbox")) {
        if (checkbox.checked) {
          li.style.textDecoration = "line-through";
        } else {
          li.style.textDecoration = "none";
        }
      }
    }

    remove(event) {
      const button = event.target;
      if (button.classList.contains("remove-button")) {
        const li = button.parentElement;
        li.remove();
      }
    }

    edit(event) {}

    onClick(event) {
      this.check(event);
      this.remove(event);
      this.edit(event);
    }
  }

  new ManagerEvents(ul);
});
