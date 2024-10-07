document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('textArea');
    const addBtn = document.getElementById('addBtn');
    const clearBtn = document.getElementById('clearBtn');
    const todoList = document.getElementById('todoList');

    function renderTasks(task) {
        const newlist = document.createElement('li');
        newlist.setAttribute('id', task.id);
        newlist.innerHTML = `<input type="checkbox" name="check" class="check" data-id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
            <span>${task.content}</span>
            <button class="deleteTask" data-id="${task.id}">Delete</button>`;
        if (task.isCompleted) {
            newlist.classList.add('completed');
        }
        todoList.appendChild(newlist);
    }

    function handleCompletion(element) {
        element.classList.toggle('completed');
    }

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTasks(task));

    // Adding a new task
    addBtn.addEventListener('click', () => {
        const text = (textArea.value).trim();
        if (text === '') return;
        let newTask = {
            id: Date.now(),
            content: text,
            isCompleted: false
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        textArea.value = '';
        renderTasks(newTask);
    });

    // Clear the input field
    clearBtn.addEventListener('click', () => {
        textArea.value = '';
    });

    // Deleting a task using event delegation
    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteTask')) {
            const taskId = event.target.dataset.id;
            tasks = tasks.filter(task => task.id != taskId);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            event.target.parentElement.remove();
        }
    });

    // Marking a task as completed using event delegation
    todoList.addEventListener('change', (event) => {
        if (event.target.classList.contains('check')) {
            const taskId = event.target.dataset.id;
            tasks.forEach(task => {
                if (task.id == taskId) {
                    task.isCompleted = event.target.checked;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    handleCompletion(event.target.parentElement);
                }
            });
        }
    });
});