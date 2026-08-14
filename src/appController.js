import Project from "./project";
import StorageController from "./storageController"; // <-- Import it

function AppController(){
    const storage = StorageController(); // <-- Initialize it
    
    // Load existing projects from storage, or start empty
    let projects = storage.load(); 
    let currentProject = null;

    // Add a helper function to save current state
    function saveState() {
        storage.save(projects);
    }

    function addProject(projectTitle){
        const project = Project(projectTitle);
        projects.push(project);
        saveState();
        return project;
    }

    function deleteProject(projectID){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getProjectID() === projectID){
                projects.splice(i, 1);
                saveState();
                break;
            }
        }
    }

    function getProjects(){
        return projects.map(a => a);
    }

    function getCurrentProject(){
        return currentProject;
    }

    function setCurrentProject(project){
        currentProject = project;
    }

    return {
        addProject,
        deleteProject,
        getProjects,
        getCurrentProject,
        setCurrentProject,
        saveState // <-- Expose this so DisplayController can trigger saves
    }
}

export default AppController;