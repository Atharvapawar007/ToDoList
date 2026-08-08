import AppController from "./appController";

// Main controller responsible for managing UI updates and DOM interactions
function DisplayController(){
    // Initialize the application logic controller
    const appController = AppController();

    // --- DOM Element Selections: List Containers ---
    const projectsList = document.querySelector("#projects-list");
    const todosList = document.querySelector("#todos-list");

    // --- DOM Element Selections: Project Modal ---
    const projectModal = document.querySelector("#project-modal");
    const addProjectButton = document.querySelector("#add-project-button");
    const showProjectModalButton = document.querySelector("#show-project-modal-button");
    const closeProjectModalButton = document.querySelector("#close-project-modal-button");

    // --- DOM Element Selections: Todo Modal ---
    const todoModal = document.querySelector("#todo-modal");
    const addTodoButton = document.querySelector("#add-todo-button");
    const showTodoModalButton = document.querySelector("#show-todo-modal-button");
    const closeTodoModalButton = document.querySelector("#close-todo-modal-button");
    
    // --- DOM Element Selections: Form Inputs ---
    const projectNameInput = document.querySelector("#project-name-input");

    const todoNameInput = document.querySelector("#todo-name-input");
    const todoPriorityInput = document.querySelector("#todo-priority-input");
    const todoDeadlineDateInput = document.querySelector("#todo-deadline-date-input");
    const todoDeadlineTimeInput = document.querySelector("#todo-deadline-time-input");

    // Selects the first todo-checkbox found in the DOM when this script runs
    const todoCheckbox = document.querySelector(".todo-checkbox");

    // Function to bind all click events to buttons and modals
    function attachEventListeners(){
        // Opens the dialog to add a new project
        showProjectModalButton.addEventListener("click", () => {
            projectModal.showModal();
        });

        // Handles saving a new project
        addProjectButton.addEventListener("click", () => {
            const projectTitle = projectNameInput.value;
            appController.addProject(projectTitle); // Pass data to the backend logic
            renderProjects(); // Re-render the UI to show the new project
            projectModal.close(); // Close the dialog
        });

        // Closes the project dialog without saving
        closeProjectModalButton.addEventListener("click", () => {
            projectModal.close();
        });

        // Opens the dialog to add a new todo
        showTodoModalButton.addEventListener("click", () => {
            todoModal.showModal();
        });

        // Handles saving a new todo item
        addTodoButton.addEventListener("click", () => {
            const currentProject = appController.getCurrentProject();

            // Extract values from the modal inputs
            const todoTitle = todoNameInput.value;
            const todoPriority = todoPriorityInput.value;
            const todoDeadlineDate = todoDeadlineDateInput.value;
            const todoDeadlineTime = todoDeadlineTimeInput.value;
            
            // Format the separate date and time into a single standard string
            const todoDeadline = convertToDeadline(todoDeadlineDate, todoDeadlineTime);

            // Append the new todo to the currently active project
            currentProject.addTodo(todoTitle, todoPriority, todoDeadline);
        });

        // Closes the todo dialog without saving
        closeTodoModalButton.addEventListener("click", () => {
            todoModal.close();
        });
    }

    // Helper function to convert raw date and time inputs into an ISO 8601 formatted string
    function convertToDeadline(date, time) {
    // If no date is provided, we can't have a deadline. Return null.
    if (!date) {
        return null;
    }

    // If a date is provided but the user didn't pick a time, 
    // default to 11:59 PM (end of the day).
    if (!time) {
        time = "23:59";
    }

    // Combine them with the "T" separator to create a standard time string
    return `${date}T${time}`;
}

    // Clears the sidebar and rebuilds the HTML for the projects list
    function renderProjects(){
        projectsList.innerHTML = ""; // Wipe the current UI list
        const projects = appController.getProjects(); // Fetch the latest data array
        
        // Loop over all projects and create list items
        for(let i = 0; i < projects.length; i++){
            const project = projects[i];
            const projectItem = document.createElement("li");
            projectItem.classList.add("project-item");
            
            // Inject the project title and delete button inside the li
            projectItem.innerHTML = `
                <span class="project-title">${project.getProjectTitle()}</span>
                <button class="delete-project-btn" title="Delete Project">&times;</button>
            `

            // Allow clicking the project item to set it as active and render its specific todos
            projectItem.addEventListener("click", () => {
                appController.setCurrentProject(project);
                renderTodos();
            });
            
            // Append the constructed element to the DOM
            projectsList.appendChild(projectItem);
        }
    }

    // Clears the main content area and rebuilds the HTML for the current project's todos
    function renderTodos(){
        todosList.innerHTML = ""; // Wipe the current UI list
        const todos = appController.getCurrentProject().getTodos(); // Fetch the current project's todos
        
        // Loop over all todos and create list items
        for(let i = 0; i < todos.length; i++){
            const todo = todos[i];
            const todoItem = document.createElement("li");
            
            // Add base class and dynamic priority class for styling
            todoItem.classList.add("todo-item");
            todoItem.classList.add(`priority-${todo.getTodoPriority()}`)
            
            // Inject the checkbox, title, deadline string, and delete button inside the li
            todoItem.innerHTML = `
                <div class="todo-left">
                    <input type="checkbox" class="todo-checkbox">
                    <span class="todo-title">${todo.getTodoTitle()}</span>
                </div>
                <div class="todo-right">
                    <span class="todo-deadline">${todo.getTodoDeadline()}</span>
                    <button class="delete-todo-btn" title="Delete Todo">&times;</button>
                </div>
            `
            
            // Append the constructed element to the DOM
            todosList.appendChild(todoItem);
        }
    }
}

export default DisplayController;