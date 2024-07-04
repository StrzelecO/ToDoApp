const showAddPanelBtn = document.querySelector('.add');
const clearAllTasksBtn = document.querySelector('.clear');

const addTaskPanel = document.querySelector('.addTask-panel');
const todoList = document.querySelector('.todo-list');

const addNewTaskBtn = document.querySelector('.add-panel-btn');
const closeAddPanelBtn = document.querySelector('.close-panel-btn');

const taskInput = document.querySelector('.addTask-panel input');

// Initialize event listeners
const initializeEventListeners = () => {
    showAddPanelBtn.addEventListener('click', showAddTaskPanel);
    clearAllTasksBtn.addEventListener('click', clearAllTasks);
};

// Show panel which allows to add new task
const showAddTaskPanel = () => {
    addTaskPanel.style.display = 'flex';
    addNewTaskBtn.addEventListener('click', handleAddNewTask);
    closeAddPanelBtn.addEventListener('click', closeAddTaskPanel);
};

// Close panel which allows to add new task
const closeAddTaskPanel = (e) => {
    if (e) e.preventDefault();
    taskInput.value = '';
    addTaskPanel.style.display = 'none';
    removePanelEventListeners();
    updateNotification();
};

// Remove event listeners from the panel
const removePanelEventListeners = () => {
    addNewTaskBtn.removeEventListener('click', handleAddNewTask);
    closeAddPanelBtn.removeEventListener('click', closeAddTaskPanel);
};

// Handle adding new task
const handleAddNewTask = (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        toggleNotification(true, 'You cannot add an empty task!');
    } else {
        addNewTask(taskText);
        closeAddTaskPanel();
    }
};

// Add new task to the list
const addNewTask = (taskText) => {
    const taskPanel = createTaskElement(taskText);
    todoList.append(taskPanel);
    toggleNotification(false, '');
};

// Create task element
const createTaskElement = (taskText) => {
    const taskPanel = document.createElement('div');
    taskPanel.classList.add('task-panel');
    taskPanel.innerHTML = `
        <div class="task">
            <p><span><div class="importance"></div></span>${taskText}</p>
        </div>
        <div class="task-btns">
            <button class="done" title="Mark as done"><i class="fa-solid fa-check" alt="check icon"></i></button>
            <button class="remove" title="Remove task"><i class="fa-solid fa-x" alt="x icon"></i></button>
        </div>
    `;
    return taskPanel;
};

// Remove all tasks from the list
const clearAllTasks = () => {
    todoList.innerHTML = '';
    updateNotification();
};

// Update notification based on the state of the todo list
const updateNotification = () => {
    if (todoList.children.length === 0) {
        toggleNotification(true, 'Your list is empty');
    } else {
        toggleNotification(false, '');
    }
};

// Handle showing or hiding notifications
const toggleNotification = (showNotification, message) => {
    const notificationElement = document.querySelector('.todo-list-notification');
    if (showNotification) {
        notificationElement.textContent = message;
        notificationElement.style.display = 'block';
    } else {
        notificationElement.style.display = 'none';
        notificationElement.textContent = '';
    }
};

// Initialize the application
const initializeApp = () => {
    initializeEventListeners();
    updateNotification();
};

// Run the application
initializeApp();

