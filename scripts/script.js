const searchForm = document.querySelector(".search-todo-form");
const inputForm = document.querySelector(".add-todo-form");
const ulNode = document.querySelector(".todo-list");
const bottomButtons = document.querySelector(".bottom-buttons");
let checkboxesFlag = true;

inputForm.addEventListener("submit", addTodo); ///adding

ulNode.addEventListener("click", interactTodo); ///deleting

searchForm.addEventListener("keyup", searchingTodos); ///searching (filtering)

inputForm.addEventListener("click", toggleAllTodos); ///checking all todos

bottomButtons.addEventListener("click", bottomButtonPress);

function bottomButtonPress({
  target
}) {
  const liArray = Array.from(ulNode.children);

  if (target.className.includes("all-button")) {

    liArray.forEach(item => item.classList.remove("hide-todo"));

  } else if (target.className.includes("active-button")) { //without tick (check false)

    liArray.forEach(item => item.querySelector(".checkbox").checked ? item.classList.add("hide-todo") : item.classList.remove("hide-todo"))

  } else if (target.className.includes("completed-button")) { //with tick (check true)

    liArray.forEach(item => item.querySelector(".checkbox").checked ? item.classList.remove("hide-todo") : item.classList.add("hide-todo"))
  }
}

function toggleAllTodos(event) {
  if (event.target.className === "input-button") {
    Array.from(ulNode.children).map(item => todoCheckToggle(item, checkboxesFlag));
    checkboxesFlag = !checkboxesFlag;
  }
}

function searchingTodos(event) {
  const searchText = event.target.value;
  const liArray = Array.from(ulNode.children);
  liArray.forEach(item => item.textContent.toLowerCase().includes(searchText.toLowerCase()) ? item.classList.remove("hide-todo") : item.classList.add("hide-todo"));
}

function interactTodo(event) {
  if (event.target.className === "delete-button") {
    event.target.parentElement.classList.add("hide-todo");
  } else {
    todoCheckToggle(event.target.parentElement);;
  }
}

function todoCheckToggle(liNode, allFlag) {
  const checkbox = liNode.querySelector(".checkbox");
  const todoText = liNode.querySelector(".todo-text");
  if (!allFlag) {
    checkbox.checked ? todoText.classList.remove("changed-todo-text") : todoText.classList.add("changed-todo-text");
    checkbox.checked = !checkbox.checked;
  } else {
    if (allFlag) {
      checkbox.checked = true;
      todoText.classList.add("changed-todo-text");
    } else {
      checkbox.checked = false;
      todoText.classList.remove("changed-todo-text");
    }
    console.log(checkbox.checked);
  }

}

function addTodo(event) {
  event.preventDefault();

  const newTodoValue = inputForm.addInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  inputForm.addInput.value = null;

  if (newTodoValue.length > 0) {
    todoRendering(newTodoValue);
  }
}

function todoRendering(newTodoValue) {
  const htmlPattern = `<li class="new-todo">
  <input type="checkbox" class="checkbox"><span class="custom-checkbox"></span>
  <h2 class="todo-text">${newTodoValue}</h2>
  <div class="delete-button"></div>
</li>`;

  //ulNode.innerHTML += htmlPattern; //полностью откатывает чекбоксы
  const liNode = document.createElement("li");
  liNode.innerHTML = htmlPattern;
  ulNode.appendChild(liNode);
}