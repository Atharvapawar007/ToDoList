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

    // Function to bind all click events to buttons and modals
    function attachEventListeners(){
        // Opens the dialog to add a new project
        showProjectModalButton.addEventListener("click", () => {
            projectModal.showModal();
        });

        // Handles saving a new project
        addProjectButton.addEventListener("click", () => {
            const projectTitle = projectNameInput.value;
            const project = appController.addProject(projectTitle); // Pass data to the backend logic
            appController.setCurrentProject(project); //set newly created project as current project
            setCurrentProjectTitle(); //Changes the current project title
            renderProjects(); // Re-render the UI to show the new project
            projectNameInput.value = ""; //Refresh the inputs
            projectModal.close(); // Close the dialog
        });

        // Closes the project dialog without saving
        closeProjectModalButton.addEventListener("click", () => {
            projectNameInput.value = ""; //Refresh the inputs
            projectModal.close();
        });

        // Opens the dialog to add a new todo
        showTodoModalButton.addEventListener("click", () => {
            const currentProject = appController.getCurrentProject();
            if(currentProject === null){
                return;
            }

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
            renderTodos();

            //refresh the inputs
            todoNameInput.value = "";
            todoPriorityInput.value = "";
            todoDeadlineDateInput.value = "";
            todoDeadlineTimeInput.value = "";

            todoModal.close();
        });

        // Closes the todo dialog without saving
        closeTodoModalButton.addEventListener("click", () => {
            //refresh the inputs
            todoNameInput.value = "";
            todoPriorityInput.value = "";
            todoDeadlineDateInput.value = "";
            todoDeadlineTimeInput.value = "";
            todoModal.close();
        });
    }

    //Handles the current project title at the header
    function setCurrentProjectTitle(){
        const currentProjectTitle = document.querySelector("#current-project-title");
        const currentProject = appController.getCurrentProject();

        if(currentProject === null){
            currentProjectTitle.innerText = "Current Project"
        }else{
            currentProjectTitle.innerText = currentProject.getProjectTitle();
        }
    }

    // Helper function to convert raw date and time inputs into an ISO 8601 formatted string
    // Helper function to convert raw date and time inputs into a readable string
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

        // Create a Date object using the standard ISO format
        const dateObj = new Date(`${date}T${time}`);

        // Array of full month names
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Extract date parts
        const monthName = months[dateObj.getMonth()];
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        // Extract and format time parts
        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour time to 12-hour time
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        // Add leading zeros to hours and minutes if they are single digits
        const paddedHours = hours.toString().padStart(2, '0');
        const paddedMinutes = minutes.toString().padStart(2, '0');

        // Combine into the requested format: "August 14, 2026 - 08:23 AM"
        return `${monthName} ${day}, ${year} - ${paddedHours}:${paddedMinutes} ${ampm}`;
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
                <button class="delete-project-button" title="Delete Project">&times;</button>
            `

            // Allow clicking the project item to set it as active and render its specific todos
            projectItem.addEventListener("click", () => {
                appController.setCurrentProject(project);
                setCurrentProjectTitle();
                renderTodos();
            });

            //add event listener for the delete todo button
            const deleteProjectButton = projectItem.querySelector(".delete-project-button");
            deleteProjectButton.addEventListener("click", (event) => {
                event.stopPropagation();
                appController.deleteProject(project.getProjectID());
                const projects = appController.getProjects();
                if(projects.length === 0){
                    appController.setCurrentProject(null);
                }else if(appController.getCurrentProject() === project){
                    appController.setCurrentProject(projects[0]);
                }
                setCurrentProjectTitle();
                renderProjects();
                renderTodos();
            });
            
            // Append the constructed element to the DOM
            projectsList.appendChild(projectItem);
        }
    }

    // Clears the main content area and rebuilds the HTML for the current project's todos
    function renderTodos(){
        const currentProject = appController.getCurrentProject();
        if(currentProject === null){
            return;
        }

        todosList.innerHTML = ""; // Wipe the current UI list
        const todos = currentProject.getTodos(); // Fetch the current project's todos
        
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
                    <button class="delete-todo-button" title="Delete Todo">&times;</button>
                </div>
            `

            //add event listener for the delete todo button
            const deleteTodoButton = todoItem.querySelector(".delete-todo-button");
            deleteTodoButton.addEventListener("click", () => {
                currentProject.deleteTodo(todo.getTodoID());
                renderTodos();
            });

            //add event listener for the todoCheckbox
            const todoCheckbox = todoItem.querySelector(".todo-checkbox");
            todoCheckbox.addEventListener("change", () => {
                if(todoCheckbox.checked){
                    todo.setTodoDone();
                }else{
                    todo.setTodoUndone();
                }
            })
            
            // Append the constructed element to the DOM
            todosList.appendChild(todoItem);
        }
    }

    return {
        attachEventListeners
    }
}

export default DisplayController;