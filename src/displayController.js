import AppController from "./appController";

function displayController(){
    const appController = AppController();

    const projectModal = document.querySelector("#project-modal");
    const addProjectButton = document.querySelector("#add-project-button");
    const showProjectModalButton = document.querySelector("#show-project-modal-button");
    const closeProjectModalButton = document.querySelector("#close-project-modal-button");

    const todoModal = document.querySelector("#todo-modal");
    const addTodoButton = document.querySelector("#add-todo-button");
    const showTodoModalButton = document.querySelector("#show-todo-modal-button");
    const closeTodoModalButton = document.querySelector("#close-todo-modal-button");
    
    const projectNameInput = document.querySelector("#project-name-input");

    const todoNameInput = document.querySelector("#todo-name-input");
    const todoPriorityInput = document.querySelector("#todo-priority-input");
    const todoDeadlineDateInput = document.querySelector("#todo-deadline-date-input");
    const todoDeadlineTimeInput = document.querySelector("#todo-deadline-time-input");

    const todoCheckbox = document.querySelector(".todo-checkbox");

    function attachEventListeners(){
        showProjectModalButton.addEventListener("click", () => {
            projectModal.showModal();
        });

        addProjectButton.addEventListener("click", () => {
            
        });

        closeProjectModalButton.addEventListener("click", () => {
            projectModal.close();
        });

        showTodoModalButton.addEventListener("click", () => {
            todoModal.showModal();
        });

        addTodoButton.addEventListener("click", () => {

        });

        closeTodoModalButton.addEventListener("click", () => {
            todoModal.close();
        });
    }
}