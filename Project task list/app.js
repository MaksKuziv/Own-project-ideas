// Змінні UI
const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection'); // ul > li
const clearBtn = document.querySelector('.clear-tasks'); // Очищення тасків
const filter = document.querySelector('#filter'); // Поле введення для фільтрації
const taskInput = document.querySelector('#task'); // Поле введення

// Завантажити всі слухачі подій
loadEventListeners();

// Load all event listeners(function)
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Додавання таска
    form.addEventListener('submit', addTask);
    // Remove task event(видалення)
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks () {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Створення Li елемента, тобто таску
        const li = document.createElement('li');
        // Додавання класу
        li.className = 'collection-item';
        // Створення тексту і добавляння його до li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // Add icom HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}
// Add Task
function addTask(e) {
    // Перевірка чи є значення
    if(taskInput.value === '') {
        alert('Add a Task');
    }
    // Створення Li елемента, тобто таску
    const li = document.createElement('li');
    // Додавання класу
    li.className = 'collection-item';
    // Створення тексту і добавляння його до li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icom HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Ви впевнені?')) {
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear Tasks
function clearTasks(){
    // taskList.innerHTML = '';

    // Швидший спосіб
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
    function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){ 
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}