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

    const categoryColors = {
        Work: 'bg-green-200',
        Home: 'bg-yellow-200',
        School: 'bg-blue-200',
        Other: 'bg-gray-200',
    };

    function displayTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        let incompleteCount = 0;

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `mb-4 p-4 ${categoryColors[todo.category] || 'bg-gray-200'}`;
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
            completeButton.onclick = () => {
                todo.status = todo.status === 'Complete' ? 'Incomplete' : 'Complete';
                displayTodos();
            };
            li.appendChild(completeButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'bg-yellow-500 text-white px-2 py-1 rounded ml-2';
            editButton.onclick = () => {
                editTodoInline(todo, li);
            };
            li.appendChild(editButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'bg-red-500 text-white px-2 py-1 rounded ml-2';
            removeButton.onclick = () => {
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

    const todoCategory = document.getElementById('todoCategory');

    todoCategory.addEventListener('change', function(event) {
        if (event.target.value === 'addNewCategory') {
            const newCategory = prompt('Enter new category name:');
            if (newCategory) {
                const newColor = prompt('Enter a color for the new category (e.g., bg-red-500):');
                if (newColor) {
                    const newOption = document.createElement('option');
                    newOption.value = newCategory;
                    newOption.textContent = newCategory;
                    newOption.className = newColor; 
                    todoCategory.insertBefore(newOption, todoCategory.lastElementChild);
                    todoCategory.value = newCategory;

                    categoryColors[newCategory] = newColor;
                } else {
                    alert('No color entered. Category not added.');
                    todoCategory.value = '';
                }
            } else {
                todoCategory.value = '';
            }
        }
    });

    document.getElementById('addTodoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('todoName').value;
        const category = document.getElementById('todoCategory').value;
        const dueDate = document.getElementById('todoDueDate').value;

        const newTodo = addTodo(name, category, dueDate);

        const li = document.createElement('li');
        li.className = `mb-4 p-4 ${categoryColors[category] || 'bg-gray-200'}`;

        const nameDiv = document.createElement('div');
        nameDiv.textContent = name;
        li.appendChild(nameDiv);

        const categoryDiv = document.createElement('div');
        categoryDiv.textContent = ` - ${category}`;
        li.appendChild(categoryDiv);

        const dueDateDiv = document.createElement('div');
        dueDateDiv.textContent = ` - ${dueDate}`;
        li.appendChild(dueDateDiv);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'bg-blue-500 text-white px-2 py-1 rounded ml-2';
        completeButton.onclick = (event) => {
            newTodo.status = newTodo.status === 'Complete' ? 'Incomplete' : 'Complete';
            displayTodos();
        };
        li.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'bg-yellow-500 text-white px-2 py-1 rounded ml-2';
        editButton.onclick = () => editTodoInline(newTodo, li);
        li.appendChild(editButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'bg-red-500 text-white px-2 py-1 rounded ml-2';
        removeButton.onclick = (event) => {
            const index = todos.indexOf(newTodo);
            if (index > -1) {
                todos.splice(index, 1);
            }
            displayTodos();
        };
        li.appendChild(removeButton);

        todoList.appendChild(li);
        addTodoForm.reset();
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

    // Add event listener for removing categories
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-category')) {
            const categoryDiv = event.target.parentElement;
            const category = categoryDiv.getAttribute('data-value');
            delete categoryColors[category];
            categoryDiv.remove();
        }
    });

    displayTodos();
    console.log(todos);
});