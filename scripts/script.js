const searchForm = document.querySelector(".search-todo-form");
const inputForm = document.querySelector(".add-todo-form");
const ulNode = document.querySelector(".todo-list");
const todoCross = document.querySelector(".todo-cross");

inputForm.addEventListener("submit", addTodo);

ulNode.addEventListener("click", deleteTodo);

function deleteTodo(event) {
  if (event.target.className === "delete-button") {
    event.target.parentElement.style.display = "none";
  }
}

function addTodo(event) {
  event.preventDefault();

  const newTodoValue = inputForm.addInput.value;

  if (newTodoValue.length > 0) {
    todoRendering(newTodoValue);
  }


}

function todoRendering(newTodoValue) {
  const htmlPattern = `<li class="new-todo"><input type="checkbox" class="todo-circle"><h2 class="todo-text">${newTodoValue}</h2><div class="delete-button"></div></li>`;

  ulNode.innerHTML += htmlPattern;
}