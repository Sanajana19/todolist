const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const searchInput = document.querySelector("#search-input");
const allTab = document.querySelector("#all-tab");
const activeTab = document.querySelector("#active-tab");
const completedTab = document.querySelector("#completed-tab");
const sortDropdown = document.querySelector("#sort-dropdown");
const selectAllBtn = document.querySelector("#select-all-btn");
const deselectAllBtn = document.querySelector("#deselect-all-btn");
const deleteSelectedBtn = document.querySelector("#delete-selected-btn");

let todos = [];

function addTodoItem(event) 
{
  event.preventDefault();

  const todoText = todoInput.value.trim(); 

  if (todoText !== "") 
  {
    const todo = 
    {
      id: Date.now(), 
      text: todoText,
      completed: false
    };

    todos.push(todo); 
    todoInput.value = ""; 

    renderTodoList();
  }
}

function renderTodoList(filteredTodos) 
{
  todoList.innerHTML = ""; 

  const todosToRender = filteredTodos || todos;  

  todosToRender.forEach(todo => {
    const listItem = document.createElement("li");

    if (todo.completed) {
      listItem.classList.add("completed");
    }

    listItem.innerHTML = `
      <input type="checkbox" class="todo-checkbox" data-id="${todo.id}" ${todo.completed ? "checked" : ""}>
      <span>${todo.text}</span>
      <button class="edit-btn" data-id="${todo.id}">Edit</button>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    `;

    todoList.appendChild(listItem);
  });
}

function toggleCompletionStatus(event) 
{
  if (event.target.matches(".todo-checkbox")) 
  {
    const todoId = parseInt(event.target.dataset.id);
    todos = todos.map(todo => 
      {
        if (todo.id === todoId) 
        {
          todo.completed = !todo.completed;
        }
       return todo;
    });

    renderTodoList();
  }
}

function editTodoItem(event) 
{
  if (event.target.matches(".edit-btn")) 
  {
    const todoId = parseInt(event.target.dataset.id);
    const todoText = prompt("Edit the to-do item:", todos.find(todo => todo.id === todoId).text);

    if (todoText !== null)
    {
      todos = todos.map(todo => 
        {
          if (todo.id === todoId) 
          {
            todo.text = todoText.trim();
          }
        return todo;
      });

      renderTodoList();
    }
  }
}

function deleteTodoItem(event) 
{
  if (event.target.matches(".delete-btn")) {
    const todoId = parseInt(event.target.dataset.id);
    todos = todos.filter(todo => todo.id !== todoId);

    renderTodoList();
  }
}

function filterTodoList() 
{
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchTerm));

  renderTodoList(filteredTodos);
}

function filterByTab(event) {
  const selectedTab = event.target;
  const tabId = selectedTab.id;

  let filteredTodos = [];

  if (tabId === "all-tab") {
    filteredTodos = todos;
  } else if (tabId === "active-tab") {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (tabId === "completed-tab") {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  renderTodoList(filteredTodos);
}

function sortTodoList() {
  const sortOption = sortDropdown.value;

  let sortedTodos = [];

  if (sortOption === "A-Z") {
    sortedTodos = todos.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortOption === "Z-A") {
    sortedTodos = todos.sort((a, b) => b.text.localeCompare(a.text));
  } else if (sortOption === "oldest") {
    sortedTodos = todos.sort((a, b) => a.id - b.id);
  } else if (sortOption === "newest") {
    sortedTodos = todos.sort((a, b) => b.id - a.id);
  }

  renderTodoList(sortedTodos);
}

function selectAll() {
  todos = todos.map(todo => ({
    ...todo,
    completed: true
  }));

  renderTodoList();
}

function deselectAll() {
  todos = todos.map(todo => ({
    ...todo,
    completed: false
  }));

  renderTodoList();
}

function deleteSelected() {
  todos = todos.filter(todo => !todo.completed);

  renderTodoList();
}

todoForm.addEventListener("submit", addTodoItem);
todoList.addEventListener("click", toggleCompletionStatus);
todoList.addEventListener("click", editTodoItem);
todoList.addEventListener("click", deleteTodoItem);
searchInput.addEventListener("input", filterTodoList);
allTab.addEventListener("click", filterByTab);
activeTab.addEventListener("click", filterByTab);
completedTab.addEventListener("click", filterByTab);
sortDropdown.addEventListener("change", sortTodoList);
selectAllBtn.addEventListener("click", selectAll);
deselectAllBtn.addEventListener("click", deselectAll);
deleteSelectedBtn.addEventListener("click", deleteSelected);
