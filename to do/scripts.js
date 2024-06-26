document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now().toString(),
        text: taskText
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.textContent = task.text;
    span.contentEditable = true;
    span.addEventListener('blur', () => updateTask(task.id, span.textContent));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('task-list');
    const taskItem = taskList.querySelector(`[data-id="${id}"]`);
    taskList.removeChild(taskItem);
}

function updateTask(id, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
