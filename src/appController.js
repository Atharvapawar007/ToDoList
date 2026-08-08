import Project from "./project";

// Factory function to manage the application's core state and logic
function AppController(){
    // Array to store all project objects created in the app
    const projects = [];
    
    // Tracks the currently active/selected project for viewing and adding todos
    let currentProject = null;

    // Creates a new project using the Project factory and adds it to the list
    function addProject(projectTitle){
        const project = Project(projectTitle);
        projects.push(project);
    }

    // Finds a project by its unique ID and removes it from the projects array
    function deleteProject(projectID){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getProjectID() === projectID){
                projects.splice(i, 1);
                break;
            }
        }
    }

    // Returns a shallow copy of the projects array to prevent direct mutation from outside
    function getProjects(){
        const newProjects = projects.map(a => a);
        return newProjects;
    }

    // Getter function for retrieving the currently selected project
    function getCurrentProject(){
        return currentProject;
    }

    // Setter function to update the currently selected project
    function setCurrentProject(project){
        currentProject = project;
    }

    // Expose public methods for use in other modules
    return {
        addProject,
        deleteProject,
        getProjects,
        getCurrentProject,
        setCurrentProject
    }
}

export default AppController;