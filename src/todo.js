function Todo(title, priority, deadline){
    const ID = crypto.randomUUID();
    let isTodoDone = false;

    function getTodoID(){
        return ID;
    }

    function getTodoTitle(){
        return title;
    }

    function setTodoTitle(newTitle){
        title = newTitle;
    }

    function getTodoPriority(){
        return priority;
    }

    function setTodoPriority(newPriority){
        priority = newPriority;
    }

    function getTodoDeadline(){
        return deadline;
    }

    function setTodoDeadline(newDeadline){
        deadline = newDeadline;
    }

    function isDone(){
        return isTodoDone;
    }

    function setTodoDone(){
        isTodoDone = true;
    }

    return {
        getTodoID,
        getTodoTitle,
        setTodoTitle,
        getTodoPriority,
        setTodoPriority,
        getTodoDeadline,
        setTodoDeadline,
        isDone,
        setTodoDone
    }
}

export default Todo;