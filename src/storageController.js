import Project from "./project";

function storageController() {
    const STORAGE_KEY = "todo_app_data";

    function save(projects) {
        // 1. Serialize: Extract only the raw data strings/booleans using your getters
        const rawData = projects.map(project => ({
            title: project.getProjectTitle(),
            todos: project.getTodos().map(todo => ({
                title: todo.getTodoTitle(),
                priority: todo.getTodoPriority(),
                deadline: todo.getTodoDeadline(),
                isDone: todo.isDone()
            }))
        }));

        // Save the raw object to localStorage as a string
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rawData));
    }

    function load() {
        const rawString = localStorage.getItem(STORAGE_KEY);
        
        // If it's a first-time visitor, return an empty array
        if (!rawString) return []; 

        const rawData = JSON.parse(rawString);

        // 2. Rehydrate: Rebuild the functional Project and Todo objects
        const rehydratedProjects = rawData.map(rawProject => {
            const project = Project(rawProject.title);

            rawProject.todos.forEach(rawTodo => {
                // Re-create the todo using the project's built-in method
                project.addTodo(rawTodo.title, rawTodo.priority, rawTodo.deadline);

                // If the saved todo was marked as done, we need to update it
                if (rawTodo.isDone) {
                    const todos = project.getTodos();
                    const justAddedTodo = todos[todos.length - 1]; // Grab the one we just made
                    justAddedTodo.setTodoDone();
                }
            });

            return project;
        });

        return rehydratedProjects;
    }

    return {
        save,
        load
    }
}

export default storageController;