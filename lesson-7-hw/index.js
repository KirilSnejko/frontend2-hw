// Задача 1: Анализ данных студентов

const students = [
  { name: "Alice", age: 20, grades: [85, 90, 78] },
  { name: "Bob", age: 22, grades: [70, 88, 95] },
  { name: "Charlie", age: 23, grades: [92, 80, 85] },
  { name: "David", age: 21, grades: [75, 85, 89] },
  { name: "Eve", age: 20, grades: [90, 92, 88] },
];

function getAverageAge(arr) {
  return arr.reduce((acc, item) => acc + item.age, 0) / arr.length;
}

console.log(`Средний возраст студентов: ${getAverageAge(students)}`);

function findStudent(arr) {
  const result = { hightAverageGrade: 0, bestStudent: null };
  arr.forEach((student) => {
    const averageGrade =
      student.grades.reduce((acc, grade) => {
        return acc + grade;
      }, 0) / student.grades.length;

    if (averageGrade > result.hightAverageGrade) {
      result.hightAverageGrade = averageGrade;
      result.bestStudent = student.name;
    }
  });
  return `Лучший студент: ${result.bestStudent}, средний бал: ${result.hightAverageGrade}`;
}

console.log(findStudent(students));

function makeList(arr, threshold) {
  const list = [];

  arr.forEach((student) => {
    const averageGrade =
      student.grades.reduce((acc, grade) => {
        return acc + grade;
      }, 0) / student.grades.length;
    if (averageGrade >= threshold) {
      list.push({ name: student.name, averageGrade: averageGrade });
    }
  });
  return list;
}
console.log("Список студентов с проходным порогом 70:");
console.log(makeList(students, 70));

// Задача 2: Управление инвентарем магазина

const inventory = [
  { name: "Laptop", category: "Electronics", price: 1000, quantity: 5 },
  { name: "Phone", category: "Electronics", price: 500, quantity: 10 },
  { name: "Shirt", category: "Clothing", price: 30, quantity: 20 },
  { name: "Pants", category: "Clothing", price: 40, quantity: 15 },
  { name: "Shoes", category: "Footwear", price: 60, quantity: 8 },
];

function totalCost(arr) {
  return arr.reduce((acc, item) => acc + item.quantity * item.price, 0);
}
console.log(`Общая стоимость всех товаров в магазине: ${totalCost(inventory)}`);

function maxQuantity(arr) {
  return arr.sort((a, b) => b.quantity - a.quantity)[0];
}
console.log("Товар с наибольшим количеством на складе:");
console.log(maxQuantity(inventory));

function listCategory(arr, category) {
  return arr.filter((item) => item.category === category);
}
console.log("Список товаров определенной категории:");
console.log(listCategory(inventory, "Electronics"));

// Задача 3: Управление библиотекой книг

const library = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
  },
  { title: "1984", author: "George Orwell", genre: "Dystopian", year: 1949 },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    year: 1932,
  },
];

function getBookByAuthor(arr, author) {
  return arr.filter((book) => book.author === author);
}
console.log("Все книги George Orwell");
console.log(getBookByAuthor(library, "George Orwell"));

function findBooksAfter(arr, afterYear) {
  return arr.filter((book) => book.year >= afterYear);
}
console.log("Все книги, изданные после 1940 года");
console.log(findBooksAfter(library, 1940));

function getUniqueGenre(arr) {
  const genres = new Set();
  arr.forEach((book) => genres.add(book.genre));
  return Array.from(genres);
}
getUniqueGenre(library);
console.log("Создать список всех жанров без повторений:");
console.log(getUniqueGenre(library));
