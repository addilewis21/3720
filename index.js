document.addEventListener('DOMContentLoaded', function() {
    let todos = [
        {
        id: 1,
        name: "Take out the trash",
        status: 'Incomplete',
        category: 'School',
        dueDate: '2021-09-01',
        },

        {
        id: 2,
        name: "Empty the dishwasher",
        status: 'Complete',
        category: 'Home',
        dueDate: '2021-09-01',
        },

    ];

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

            const nameDiv = document.createElement('div');
            nameDiv.textContent = todo.name;
            li.appendChild(nameDiv);

            const categoryDiv = document.createElement('div');
            categoryDiv.textContent = ` - ${todo.category}`;
            li.appendChild(categoryDiv);

            const dueDateDiv = document.createElement('div');
            dueDateDiv.textContent = ` - ${todo.dueDate}`;
            li.appendChild(dueDateDiv);

            const completeButton = document.createElement('button');
            completeButton.textContent = todo.status === 'Complete' ? 'Incomplete' : 'Complete';
            completeButton.className = 'bg-blue-500 text-white px-2 py-1 rounded ml-2';
            completeButton.onclick = (event) => {
                todo.status = todo.status === 'Complete' ? 'Incomplete' : 'Complete';
                displayTodos();
            };
            li.appendChild(completeButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'bg-yellow-500 text-white px-2 py-1 rounded ml-2';
            editButton.onclick = (event) => {
                editTodoInline(todo, li);
            };
            li.appendChild(editButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'bg-red-500 text-white px-2 py-1 rounded ml-2';
            removeButton.onclick = (event) => {
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

    document.getElementById('addTodoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('todoName').value;
        const category = document.getElementById('todoCategory').value;
        const dueDate = document.getElementById('todoDueDate').value;
        const newTodo = addTodo(name, category, dueDate);
        displayTodos();
    });

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

    function completeTodo(id) {
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todo.status = 'Complete';
        }
    }

    function deleteCategory(category) {
        const index = categories.indexOf(category);
        if (index > -1) {
            categories.splice(index, 1);
        }
    }

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
            event.stopPropagation(); 
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
            event.stopPropagation(); 
            displayTodos();
        };
        li.appendChild(cancelButton);
    }
    
    document.getElementById('clearCompletedButton').addEventListener('click', function() {
        clearCompletedTodos();
    });

    function clearCompletedTodos() {
        console.log('Before clearing:', todos); 
        todos = todos.filter(todo => todo.status !== 'Complete');
        console.log('After clearing:', todos); 
        displayTodos();
    }

    displayTodos();
    console.log(todos);
});