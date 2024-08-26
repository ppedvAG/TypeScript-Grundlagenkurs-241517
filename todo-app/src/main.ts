import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Hello Todo-List!</h1>
  <ul id="list"></ul>
  <form action="">
    <label for="">Aufgabe</label>
    <input type="text" id="task" />
    <br />
    <button id="submit">Neue Aufgabe</button>
  </form>
`;

const todoList = <HTMLUListElement>document.getElementById("list");
const taskInput = <HTMLInputElement>document.getElementById("task");
const formInput = document.querySelector<HTMLFormElement>("form");
const submitButton = document.getElementById("submit");

submitButton!.addEventListener("click", function (e) {
  // Default Submit action verhindern, welches Server Request auslöst
  e.preventDefault();

  const listItem = document.createElement("li");
  listItem.innerText = taskInput.value;
  todoList.appendChild(listItem);
  formInput!.reset();
});
