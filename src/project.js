import Todo from "./todo";

function Project(title){
    const ID = crypto.randomUUID();
    const todos = [];

    function getProjectID(){
        return ID;
    }

    function getProjectTitle(){
        return title;
    }

    function setProjectTitle(newTitle){
        title = newTitle;
    }

    function addTodo(title, priority, deadline){
        const todo = Todo(title, priority, deadline);
        todos.push(todo);
    }

    function deleteTodo(todoID){
        for(let i = 0; i < todos.length; i++){
            if(todos[i].getTodoID() === todoID){
                todos.splice(i, 1);
                break;
            }
        }
    }

    function getTodos(){
        const newTodos = todos.map(a => a);
        return newTodos;
    }

    return {
        getProjectID,
        getProjectTitle,
        setProjectTitle,
        addTodo,
        deleteTodo,
        getTodos
    }
}

export default Project;