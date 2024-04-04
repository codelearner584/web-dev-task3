document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => addTask(taskText));

    // Event listener for adding a new task
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            updateLocalStorage();
        }
    });

    // Function to add a new task
    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerText = taskText;
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.addEventListener('click', function() {
            const newText = prompt('Edit task:', taskText);
            if (newText !== null && newText.trim() !== '') {
                li.innerText = newText.trim();
                updateLocalStorage();
            }
        });
        li.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                li.remove();
                updateLocalStorage();
            }
        });
        li.appendChild(deleteBtn);

        // Toggle completed status
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            updateLocalStorage();
        });
        
        taskList.appendChild(li);
        updateLocalStorage();
    }

    // Function to update local storage
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => tasks.push(li.innerText));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
