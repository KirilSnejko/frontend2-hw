function parseElement(element) {
  const obj = {
    tagName: element.tagName.toLowerCase(),
    attributes: {},
    children: [],
  };

  // Получаем атрибуты с использованием forEach
  Array.from(element.attributes).forEach((attr) => {
    obj.attributes[attr.name] = attr.value;
  });

  // Рекурсивно обрабатываем дочерние элементы
  Array.from(element.children).forEach((child) => {
    obj.children.push(parseElement(child));
  });

  return obj;
}
function createList(obj) {
  const ul = document.createElement("ul");
  const liTag = document.createElement("li");
  liTag.textContent = obj.tagName;

  // Добавляем атрибуты
  for (let [key, value] of Object.entries(obj.attributes)) {
    const attrLi = document.createElement("li");
    attrLi.textContent = `${key}: ${value}`;
    ul.appendChild(attrLi);
  }

  ul.appendChild(liTag);

  // Добавляем дочерние элементы
  for (let child of obj.children) {
    ul.appendChild(createList(child));
  }

  return ul;
}

// Получаем элемент, который нужно парсить
const contentDiv = document.querySelector(".content");
const parsedData = parseElement(contentDiv);

// Выводим результат
const outputDiv = document.getElementById("output");
outputDiv.appendChild(createList(parsedData));
