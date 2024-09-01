document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.querySelector("#addTaskButton");
  const ul = document.querySelector("#itemsList");
  const inputTask = document.querySelector("#inputTask");
  const errorText = document.querySelector("#errorText");

  addTaskButton.onclick = addTask;

  function addTask() {
    const li = document.createElement("li");
    const taskValue = inputTask.value;

    const createLi = createNewTask(li, taskValue);

    ul.appendChild(createLi);
    inputTask.value = "Например, новая задача";
  }

  function createNewTask(li, taskValue) {
    if (taskValue === "") {
      errorText.textContent = "Поле не может быть пустым";
      inputTask.value = "Например, новая задача";
      return;
    } else {
      li.insertAdjacentHTML(
        "beforeend",
        `
          <input type="checkbox" class="task-checkbox">
        `
      );
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskValue;
      input.readOnly = true;
      input.classList.add("inputTask");
      li.appendChild(input);

      li.insertAdjacentHTML(
        "beforeend",
        `
          <button class="remove-button">[x]</button>
          <button class="edit-button">[edit]</button>
        `
      );
      errorText.textContent = "";
    }
    return li;
  }

  class ManagerEvents {
    constructor(elem) {
      elem.onclick = this.onClick.bind(this);
    }

    check(event) {
      const checkbox = event.target;
      const li = checkbox.parentElement;
      const input = li.querySelector(".inputTask");
      if (checkbox.classList.contains("task-checkbox")) {
        if (checkbox.checked) {
          input.classList.add("line-through");
        } else {
          input.classList.remove("line-through");
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

    edit(event) {
      const button = event.target;
      const li = button.parentElement;
      const input = li.querySelector(".inputTask");

      if (button.classList.contains("edit-button")) {
        if (button.textContent === "[edit]") {
          input.readOnly = false;
          input.classList.add("editTask");
          input.focus();
          button.textContent = "[save]";
        } else {
          input.readOnly = true;
          button.textContent = "[edit]";
          input.classList.remove("editTask");
        }
      }
    }

    onClick(event) {
      this.check(event);
      this.remove(event);
      this.edit(event);
    }
  }

  new ManagerEvents(ul);
});
