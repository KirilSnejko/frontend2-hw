document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("note-input");
  const addNoteButton = document.getElementById("add-note");
  const noteList = document.getElementById("note-list");
  const searchInput = document.getElementById("search-input");

  // Загрузка заметок из localStorage
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    noteList.innerHTML = ""; // Очищаем текущий список заметок
    notes.forEach((note, index) => {
      addNoteToDOM(note, index);
    });
  }

  // Добавление заметки в DOM
  function addNoteToDOM(note, index) {
    const li = document.createElement("li");
    li.textContent = note;

    const editButton = document.createElement("button");
    editButton.textContent = "Редактировать";
    editButton.addEventListener("click", () => editNote(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteNote(index));

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    noteList.appendChild(li);
  }

  // Добавление новой заметки
  addNoteButton.addEventListener("click", function () {
    const note = noteInput.value.trim();
    if (note) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteInput.value = ""; // Очищаем поле ввода
      loadNotes(); // Перезагружаем заметки
    }
  });

  // Редактирование заметки
  function editNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const newNote = prompt("Редактировать заметку:", notes[index]);
    if (newNote !== null) {
      notes[index] = newNote;
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
    }
  }

  // Удаление заметки
  function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1); // Удаляем заметку
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes(); // Обновляем список заметок
  }

  // Фильтрация заметок по запросу
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    noteList.innerHTML = ""; // Очищаем текущий список заметок
    notes.forEach((note, index) => {
      if (note.toLowerCase().includes(query)) {
        addNoteToDOM(note, index); // Добавляем заметку, если она соответствует запросу
      }
    });
  });

  // Синхронизация данных между вкладками
  window.addEventListener("storage", function (event) {
    if (event.key === "notes") {
      loadNotes(); // Перезагружаем заметки при изменении в другой вкладке
    }
  });

  loadNotes(); // Загрузка заметок при инициализации
});
