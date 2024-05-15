let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let tasks = [];

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Check if username and password match
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        // Hide login form
        document.getElementById('login-form').style.display = 'none';
        // Show task management form
        document.getElementById('task-form').style.display = 'block';
        // Display welcome message
        document.getElementById('welcome-message').innerText = `Welcome, ${user.username}!`;
    } else {
        alert('Invalid username or password.');
    }
}

function showSignup() {
    // Hide login form
    document.getElementById('login-form').style.display = 'none';
    // Show signup form
    document.getElementById('signup-form').style.display = 'block';
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // Check if username is not empty
    if (username.trim() === '') {
        alert('Please enter a username.');
        return;
    }

    // Check if password is not empty
    if (password.trim() === '') {
        alert('Please enter a password.');
        return;
    }

    // Check if username is already taken
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    // If username is available, create new user
    const newUser = { username, password };
    users.push(newUser);
    // Save users to local storage
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;

    // Hide sign-up form and show task form
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('task-form').style.display = 'block';
}

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;

    // Create task object
    const task = { name: taskName, date: taskDate, time: taskTime };
    // Add task to tasks array
    tasks.push(task);
    // Display tasks
    displayTasks();
}

function deleteTask(index) {
    // Remove task from tasks array
    tasks.splice(index, 1);
    // Update task list display
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    // Clear existing tasks
    taskList.innerHTML = '';

    // Display each task
    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <div>
                <p>${task.name} - ${task.date} ${task.time}</p>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
    });

    // Show task list
    taskList.style.display = 'block';
}

function viewTasks() {
    // Show task list
    document.getElementById('task-list').style.display = 'block';
}

function logout() {
    // Clear current user
    currentUser = null;
    // Hide task management form
    document.getElementById('task-form').style.display = 'none';
    // Hide task list
    document.getElementById('task-list').style.display = 'none';
    // Show login form
    document.getElementById('login-form').style.display = 'block';
}

// Function calls
displayWeeklySchedule();
