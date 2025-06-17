let tasks = [];

function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showAlert(message, type) {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    setTimeout(() => {
        alertPlaceholder.innerHTML = '';
    }, 3000);
}

function updateTaskCount() {
    document.getElementById('taskCount').textContent = tasks.length;
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `list-group-item bg-dark text-light d-flex justify-content-between align-items-center border-secondary ${task.completed ? 'text-decoration-line-through text-muted' : ''}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="btn btn-sm btn-success me-2" onclick="toggleComplete(${index})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    updateTaskCount();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        showAlert('Please enter a task!', 'danger');
        return;
    }
    tasks.push({ text: taskText, completed: false });
    saveToLocalStorage();
    renderTasks();
    taskInput.value = '';
    showAlert('Task added successfully!', 'success');
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveToLocalStorage();
    renderTasks();
    showAlert('Task deleted successfully!', 'danger');
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveToLocalStorage();
    renderTasks();
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);