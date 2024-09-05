document.addEventListener('DOMContentLoaded', function() {
  const todos = [];
  const categories = [];

  document.getElementById('addTodoForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('todoName').value;
      const category = document.getElementById('todoCategory').value;
      const dueDate = document.getElementById('todoDueDate').value;
      const newTodo = addTodo(name, category, dueDate);
      displayTodos();
  });

  document.getElementById('addCategoryForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const category = document.getElementById('categoryName').value;
      addCategory(category);
      displayCategories();
  });

  function displayTodos() {
      const todoList = document.getElementById('todoList');
      todoList.innerHTML = '';
      todos.forEach(todo => {
          const li = document.createElement('li');
          li.textContent = `${todo.name} - ${todo.category} - ${todo.dueDate}`;
          li.className = todo.status === 'Complete' ? 'line-through' : '';
          li.onclick = () => {
              todo.status = todo.status === 'Complete' ? 'Incomplete' : 'Complete';
              displayTodos();
          };

          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.className = 'bg-red-500 text-white px-2 py-1 rounded ml-2';
          removeButton.onclick = (event) => {
              event.stopPropagation(); // Prevent the click event from bubbling up to the li
              const index = todos.indexOf(todo);
              if (index > -1) {
                  todos.splice(index, 1);
              }
              displayTodos();
          };
          li.appendChild(removeButton);

          todoList.appendChild(li);
      });
  }

  function displayCategories() {
      const categoryList = document.getElementById('categoryList');
      categoryList.innerHTML = '';
      categories.forEach(category => {
          const li = document.createElement('li');
          li.textContent = category;
          
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded';
          deleteButton.onclick = () => {
              deleteCategory(category);
              displayCategories();
          };
          li.appendChild(deleteButton);

          categoryList.appendChild(li);
      });
  }

  // Define the addTodo function
  function addTodo(name, category, dueDate) {
      const newTodo = {
          id: Date.now(),
          name: name,
          category: category,
          dueDate: dueDate,
          status: 'Incomplete'
      };
      todos.push(newTodo);
      return newTodo;
  }

  // Define the completeTodo function
  function completeTodo(id) {
      const todo = todos.find(todo => todo.id === id);
      if (todo) {
          todo.status = 'Complete';
      }
  }

  // Define the deleteCategory function
  function deleteCategory(category) {
      const index = categories.indexOf(category);
      if (index > -1) {
          categories.splice(index, 1);
      }
  }

  displayTodos();
  displayCategories();
});