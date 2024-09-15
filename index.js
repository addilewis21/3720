document.addEventListener('DOMContentLoaded', function() {
    let todos = [];
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

    document.getElementById('clearCompletedButton').addEventListener('click', function() {
        clearCompletedTodos();
    });

    function displayTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        let incompleteCount = 0;

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'mb-4';
            if (todo.status === 'Complete') {
                li.className += ' line-through';
            } else {
                incompleteCount++;
            }

            const nameSpan = document.createElement('span');
            nameSpan.textContent = todo.name;
            li.appendChild(nameSpan);

            const categorySpan = document.createElement('span');
            categorySpan.textContent = ` - ${todo.category}`;
            li.appendChild(categorySpan);

            const dueDateSpan = document.createElement('span');
            dueDateSpan.textContent = ` - ${todo.dueDate}`;
            li.appendChild(dueDateSpan);

            const completeButton = document.createElement('button');
            completeButton.textContent = todo.status === 'Complete' ? 'Incomplete' : 'Complete';
            completeButton.className = 'bg-blue-500 text-white px-2 py-1 rounded ml-2';
            completeButton.onclick = (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the li
                todo.status = todo.status === 'Complete' ? 'Incomplete' : 'Complete';
                displayTodos();
            };
            li.appendChild(completeButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'bg-yellow-500 text-white px-2 py-1 rounded ml-2';
            editButton.onclick = (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the li
                editTodoInline(todo, li);
            };
            li.appendChild(editButton);

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

        const incompleteCountElement = document.getElementById('incompleteCount');
        incompleteCountElement.textContent = `Incomplete Todos: ${incompleteCount}`;
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

    // Define the editTodoInline function
    function editTodoInline(todo, li) {
        li.innerHTML = '';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = todo.name;
        li.appendChild(nameInput);

        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.value = todo.category;
        li.appendChild(categoryInput);

        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.value = todo.dueDate;
        li.appendChild(dueDateInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'bg-green-500 text-white px-2 py-1 rounded ml-2';
        saveButton.onclick = (event) => {
            event.stopPropagation(); // Prevent the click event from bubbling up to the li
            todo.name = nameInput.value;
            todo.category = categoryInput.value;
            todo.dueDate = dueDateInput.value;
            displayTodos();
        };
        li.appendChild(saveButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.className = 'bg-gray-500 text-white px-2 py-1 rounded ml-2';
        cancelButton.onclick = (event) => {
            event.stopPropagation(); // Prevent the click event from bubbling up to the li
            displayTodos();
        };
        li.appendChild(cancelButton);
    }

    // Define the clearCompletedTodos function
    function clearCompletedTodos() {
        console.log('Before clearing:', todos); // Debugging line
        todos = todos.filter(todo => todo.status !== 'Complete');
        console.log('After clearing:', todos); // Debugging line
        displayTodos();
    }

    displayTodos();
    displayCategories();
});